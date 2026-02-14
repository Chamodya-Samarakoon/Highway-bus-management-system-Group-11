import { useEffect, useState } from "react";
import { feedbackService } from "../../services/feedback.service";
import type { Feedback } from "../../types";
import Loading from "../../components/common/Loading";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";

export default function MyFeedback() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Feedback[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await feedbackService.myFeedback();
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
            <h2 className="pageTitle center">My Feedback</h2>

            {loading ? (
                <Loading />
            ) : items.length === 0 ? (
                <Card className="centerCard">
                    <EmptyState title="No feedback yet" subtitle="Submit a feedback/complaint to see it here!" />
                </Card>
            ) : (
                <div className="list">
                    {items.map((f) => (
                        <Card key={f.id} className="bookingCard">
                            <div className="bookingTop">
                                <b>{f.subject}</b>
                                {f.status && <span className={`status status--${f.status.toLowerCase()}`}>{f.status}</span>}
                            </div>
                            <div className="muted small">{f.type}{f.busNumber ? ` • ${f.busNumber}` : ""}</div>
                            <p style={{ marginTop: 10 }}>{f.message}</p>
                            <div className="muted small">Sent: {new Date(f.createdAt).toLocaleString()}</div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
