import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { feedbackService } from "../../services/feedback.service";
import HeroBanner from "../../components/schedules/HeroBanner";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SubmitFeedback() {
    const { isAuthenticated } = useAuth();
    const nav = useNavigate();

    const [type, setType] = useState<"Feedback" | "Complaint">("Feedback");
    const [busNumber, setBusNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOk(null);
        setErr(null);

        if (!isAuthenticated) {
            nav("/login");
            return;
        }

        setBusy(true);
        try {
            await feedbackService.submit({
                type,
                busNumber: busNumber.trim() || undefined,
                subject,
                message,
            });
            setOk("Feedback submitted successfully!");
            setBusNumber("");
            setSubject("");
            setMessage("");
        } catch (ex: any) {
            setErr(ex?.response?.data?.message || "Submit failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div>
            <HeroBanner title="Feedback & Complaints" subtitle="We value your opinion and are here to help" />

            <section className="pageSection">
                <Card className="formCard">
                    <h2>Submit Your Feedback</h2>

                    <form onSubmit={submit} className="form">
                        <div className="radioRow">
                            <span className="field__label">Type</span>
                            <label className="radio">
                                <input type="radio" checked={type === "Feedback"} onChange={() => setType("Feedback")} />
                                Feedback
                            </label>
                            <label className="radio">
                                <input type="radio" checked={type === "Complaint"} onChange={() => setType("Complaint")} />
                                Complaint
                            </label>
                        </div>

                        <Input
                            label="Bus Number (Optional)"
                            placeholder="e.g., HB-101"
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                        />
                        <Input label="Subject *" placeholder="Brief summary of your feedback" value={subject} onChange={(e) => setSubject(e.target.value)} />

                        <label className="field">
                            <span className="field__label">Message *</span>
                            <textarea className="textarea" placeholder="Share your thoughts and suggestions..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        </label>

                        {ok && <div className="success">{ok}</div>}
                        {err && <div className="alert">{err}</div>}

                        <Button disabled={busy} type="submit" className="full">
                            {busy ? "Submitting..." : "Submit Feedback"}
                        </Button>
                    </form>
                </Card>
            </section>
        </div>
    );
}
