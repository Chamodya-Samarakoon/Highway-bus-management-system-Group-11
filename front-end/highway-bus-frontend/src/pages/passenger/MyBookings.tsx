import { useEffect, useState } from "react";
import { bookingService } from "../../services/booking.service";
import type { Booking } from "../../types";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Card from "../../components/common/Card";

export default function MyBookings() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Booking[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await bookingService.myBookings();
                setItems(data);
            } catch {
                setItems([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="pageSection">
            <h2 className="pageTitle center">My Bookings</h2>

            {loading ? (
                <Loading />
            ) : items.length === 0 ? (
                <Card className="centerCard">
                    <EmptyState title="No bookings yet" subtitle="Book your first bus ticket to see it here!" />
                </Card>
            ) : (
                <div className="list">
                    {items.map((b) => (
                        <Card key={b.id} className="bookingCard">
                            <div className="bookingTop">
                                <b>{b.scheduleCode}</b>
                                <span className={`status status--${b.status.toLowerCase()}`}>{b.status}</span>
                            </div>
                            <div className="bookingRow">{b.from} → {b.to}</div>
                            <div className="bookingRow">Departure: {b.departureTime}</div>
                            <div className="bookingRow">Seats: {b.seats.join(", ")}</div>
                            <div className="bookingRow"><b>Total: LKR {b.totalPrice}</b></div>
                            <div className="muted small">Booked on: {new Date(b.createdAt).toLocaleString()}</div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
