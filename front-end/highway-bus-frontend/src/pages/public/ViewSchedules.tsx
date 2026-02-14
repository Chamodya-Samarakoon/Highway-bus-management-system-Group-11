import { useEffect, useMemo, useState } from "react";
import HeroBanner from "../../components/schedules/HeroBanner";
import ScheduleFilters from "../../components/schedules/ScheduleFilters";
import ScheduleCard from "../../components/schedules/ScheduleCard";
import Loading from "../../components/common/Loading";
import { scheduleService } from "../../services/schedule.service";
import type { BusSchedule } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function ViewSchedules() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<BusSchedule[]>([]);
    const nav = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const filtered = useMemo(() => {
        const f = from.trim().toLowerCase();
        const t = to.trim().toLowerCase();
        return items.filter((s) => {
            const okFrom = !f || s.from.toLowerCase().includes(f);
            const okTo = !t || s.to.toLowerCase().includes(t);
            return okFrom && okTo;
        });
    }, [items, from, to]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await scheduleService.listPublic();
                setItems(data);
            } catch {
                setItems([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const onBook = (scheduleId: string) => {
        if (!isAuthenticated) {
            nav("/login");
            return;
        }
        if (user?.role === "ADMIN") {
            nav("/admin");
            return;
        }
        nav(`/app/checkout/${scheduleId}`);
    };

    return (
        <div>
            <HeroBanner />
            <section className="pageSection">
                <h2 className="pageTitle">Bus Schedules</h2>
                <p className="pageSub">View all available bus schedules. Login to book your tickets.</p>

                <ScheduleFilters from={from} to={to} onChangeFrom={setFrom} onChangeTo={setTo} />

                {loading ? (
                    <Loading />
                ) : (
                    <div className="list">
                        {filtered.map((s) => (
                            <ScheduleCard key={s.id} schedule={s} onBook={onBook} showBookButton />
                        ))}
                        {filtered.length === 0 && <p className="muted">No schedules found.</p>}
                    </div>
                )}
            </section>
        </div>
    );
}
