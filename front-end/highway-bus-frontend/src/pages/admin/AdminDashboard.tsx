import { useEffect, useState } from "react";
import AdminStatCard from "../../components/admin/AdminStatCard";
import Loading from "../../components/common/Loading";
import { scheduleService } from "../../services/schedule.service";
import { bookingService } from "../../services/booking.service";
import { feedbackService } from "../../services/feedback.service";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ schedules: 0, bookings: 0, feedback: 0 });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const [s, b, f] = await Promise.all([
                    scheduleService.listAdmin(),
                    bookingService.adminBookings(),
                    feedbackService.adminFeedback(),
                ]);
                setStats({ schedules: s.length, bookings: b.length, feedback: f.length });
            } catch {
                setStats({ schedules: 0, bookings: 0, feedback: 0 });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="pageSection">
            <h2 className="pageTitle">Admin Dashboard</h2>
            <p className="pageSub">Manage schedules, bookings, users, and feedback.</p>

            {loading ? (
                <Loading />
            ) : (
                <div className="adminGrid">
                    <AdminStatCard label="Total Schedules" value={stats.schedules} />
                    <AdminStatCard label="Total Bookings" value={stats.bookings} />
                    <AdminStatCard label="Feedback / Complaints" value={stats.feedback} />
                </div>
            )}
        </section>
    );
}
