import { useEffect, useState } from "react";
import type { Feedback } from "../../types";
import { feedbackService } from "../../services/feedback.service";
import Loading from "../../components/common/Loading";
import AdminTable from "../../components/admin/AdminTable";
import Button from "../../components/common/Button";

export default function ManageFeedback() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Feedback[]>([]);

    const load = async () => {
        try {
            setLoading(true);
            const data = await feedbackService.adminFeedback();
            setItems(data);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const setStatus = async (id: string, status: string) => {
        await feedbackService.updateStatus(id, status);
        await load();
    };

    return (
        <section className="pageSection">
            <h2 className="pageTitle">Manage Feedback</h2>
            <p className="pageSub">Handle complaints and feedback.</p>

            {loading ? (
                <Loading />
            ) : (
                <AdminTable title="Feedback" columns={["Type", "Bus", "Subject", "Status", "Created", "Actions"]}>
                    {items.map((f) => (
                        <tr key={f.id}>
                            <td>{f.type}</td>
                            <td>{f.busNumber || "-"}</td>
                            <td>{f.subject}</td>
                            <td>{f.status || "NEW"}</td>
                            <td>{new Date(f.createdAt).toLocaleString()}</td>
                            <td className="actions">
                                <Button variant="secondary" onClick={() => setStatus(f.id, "IN_PROGRESS")}>In Progress</Button>
                                <Button onClick={() => setStatus(f.id, "RESOLVED")}>Resolve</Button>
                            </td>
                        </tr>
                    ))}
                </AdminTable>
            )}
        </section>
    );
}
