import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { BusSchedule } from "../../types";
import { scheduleService } from "../../services/schedule.service";
import Loading from "../../components/common/Loading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import SeatPicker from "../../components/booking/SeatPicker";
import BookingSummary from "../../components/booking/BookingSummary";
import { bookingService } from "../../services/booking.service";

export default function BookingCheckout() {
    const { scheduleId } = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(true);
    const [schedule, setSchedule] = useState<BusSchedule | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const list = await scheduleService.listPublic();
                const found = list.find((x) => x.id === scheduleId) || null;
                setSchedule(found);
            } catch {
                setSchedule(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [scheduleId]);

    const toggle = (seat: number) => {
        setSelected((prev) => (prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]));
    };

    const confirm = async () => {
        if (!schedule) return;
        setErr(null);
        if (selected.length === 0) {
            setErr("Please select at least 1 seat.");
            return;
        }
        setBusy(true);
        try {
            await bookingService.create(schedule.id, selected);
            nav("/app/bookings");
        } catch (ex: any) {
            setErr(ex?.response?.data?.message || "Booking failed");
        } finally {
            setBusy(false);
        }
    };

    if (loading) return <Loading text="Loading schedule..." />;
    if (!schedule) return <p className="muted">Schedule not found.</p>;

    return (
        <div className="checkout">
            <div className="checkoutLeft">
                <Card>
                    <h2>Choose Seats</h2>
                    <p className="muted">Select your seats (max 5).</p>
                    <SeatPicker
                        total={schedule.seatsTotal}
                        available={schedule.seatsAvailable}
                        selected={selected}
                        onToggle={toggle}
                        max={5}
                    />
                    {err && <div className="alert">{err}</div>}
                    <div className="checkoutActions">
                        <Button variant="secondary" onClick={() => nav(-1)}>Back</Button>
                        <Button disabled={busy} onClick={confirm}>{busy ? "Booking..." : "Confirm Booking"}</Button>
                    </div>
                </Card>
            </div>

            <div className="checkoutRight">
                <BookingSummary
                    from={schedule.from}
                    to={schedule.to}
                    code={schedule.code}
                    departureTime={schedule.departureTime}
                    arrivalTime={schedule.arrivalTime}
                    price={schedule.priceLkr}
                    seats={selected}
                />
            </div>
        </div>
    );
}
