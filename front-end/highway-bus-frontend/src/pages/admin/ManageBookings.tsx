import { useEffect, useState } from "react";
import type { Booking } from "../../types";
import { bookingService } from "../../services/booking.service";
import Loading from "../../components/common/Loading";
import AdminTable from "../../components/admin/AdminTable";

export default function ManageBookings() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Booking[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await bookingService.adminBookings();
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
            <h2 className="pageTitle">Manage Bookings</h2>
            <p className="pageSub">View all passenger bookings.</p>

            {loading ? (
                <Loading />
            ) : (
                <AdminTable title="Bookings" columns={["Code", "Route", "Seats", "Total", "Status", "Created"]}>
                    {items.map((b) => (
                        <tr key={b.id}>
                            <td>{b.scheduleCode}</td>
                            <td>{b.from} → {b.to}</td>
                            <td>{b.seats.join(", ")}</td>
                            <td>LKR {b.totalPrice}</td>
                            <td>{b.status}</td>
                            <td>{new Date(b.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </AdminTable>
            )}
        </section>
    );
}
