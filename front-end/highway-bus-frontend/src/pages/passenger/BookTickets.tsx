import { useEffect, useMemo, useState } from "react";
import HeroBanner from "../../components/schedules/HeroBanner";
import ScheduleFilters from "../../components/schedules/ScheduleFilters";
import ScheduleCard from "../../components/schedules/ScheduleCard";
import Loading from "../../components/common/Loading";
import { scheduleService } from "../../services/schedule.service";
import type { BusSchedule } from "../../types";
import { useNavigate } from "react-router-dom";

export default function BookTickets() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<BusSchedule[]>([]);
    const nav = useNavigate();

    const filtered = useMemo(() => {
        const f = from.trim().toLowerCase();
        const t = to.trim().toLowerCase();
        return items.filter((s) => (!f || s.from.toLowerCase().includes(f)) && (!t || s.to.toLowerCase().includes(t)));
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

    return (
        <div>
            <HeroBanner />
            <section className="pageSection">
                <h2 className="pageTitle">Bus Schedules</h2>
                <p className="pageSub">View all available bus schedules. Choose one to book.</p>

                <ScheduleFilters from={from} to={to} onChangeFrom={setFrom} onChangeTo={setTo} />

                {loading ? (
                    <Loading />
                ) : (
                    <div className="list">
                        {filtered.map((s) => (
                            <ScheduleCard key={s.id} schedule={s} onBook={(id) => nav(`/app/checkout/${id}`)} showBookButton />
                        ))}
                        {filtered.length === 0 && <p className="muted">No schedules found.</p>}
                    </div>
                )}
            </section>
        </div>
    );
}
