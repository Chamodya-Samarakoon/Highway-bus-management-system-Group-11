import { Clock, MapPin, Users } from "lucide-react";
import type { BusSchedule } from "../../types";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function ScheduleCard({
    schedule,
    onBook,
    showBookButton = true,
}: {
    schedule: BusSchedule;
    onBook?: (scheduleId: string) => void;
    showBookButton?: boolean;
}) {
    const isExpress = schedule.type === "Express";

    return (
        <Card className="scheduleCard">
            <div className="scheduleCard__left">
                <div className="scheduleCard__tags">
                    <span className="tagCode">{schedule.code}</span>
                    <Badge tone={isExpress ? "success" : "info"}>{schedule.type}</Badge>
                </div>

                <div className="scheduleCard__grid">
                    <div className="info">
                        <MapPin size={18} />
                        <div>
                            <div className="label">From</div>
                            <div className="value">{schedule.from}</div>
                        </div>
                    </div>

                    <div className="info">
                        <MapPin size={18} />
                        <div>
                            <div className="label">To</div>
                            <div className="value">{schedule.to}</div>
                        </div>
                    </div>

                    <div className="info">
                        <Clock size={18} />
                        <div>
                            <div className="label">Departure</div>
                            <div className="value">{schedule.departureTime}</div>
                        </div>
                    </div>

                    <div className="info">
                        <Clock size={18} />
                        <div>
                            <div className="label">Arrival</div>
                            <div className="value">{schedule.arrivalTime}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scheduleCard__right">
                <div className="price">
                    <div className="price__value">LKR {schedule.priceLkr}</div>
                    <div className="seats">
                        <Users size={16} />
                        <span>
                            {schedule.seatsAvailable} / {schedule.seatsTotal} seats
                        </span>
                    </div>
                </div>

                {showBookButton && (
                    <Button
                        disabled={schedule.seatsAvailable <= 0}
                        onClick={() => onBook?.(schedule.id)}
                        className="bookBtn"
                    >
                        Book Now
                    </Button>
                )}
            </div>
        </Card>
    );
}
