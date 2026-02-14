import { useState } from "react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import registerImg from "../../assets/register.jpg";

export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);

        if (password !== confirm) {
            setErr("Passwords do not match");
            return;
        }

        setBusy(true);
        try {
            const user = await register(fullName, email, password);
            nav(user.role === "ADMIN" ? "/admin" : "/app");
        } catch (ex: any) {
            setErr(ex?.response?.data?.message || "Register failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="authWrap">
            <div className="authLeft">
                <img src={registerImg} className="authImage" alt="register" />
                <div className="authImageOverlay">
                    <h2>Start Your Journey!</h2>
                    <p>Create an account to book tickets and enjoy seamless travel</p>
                </div>
            </div>

            <Card className="authCard">
                <h2 className="authTitle">Register</h2>
                {err && <div className="alert">{err}</div>}

                <form onSubmit={onSubmit} className="form">
                    <Input label="Full Name" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <Input label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />

                    <Button disabled={busy} type="submit" className="full">
                        {busy ? "Creating..." : "Register"}
                    </Button>
                </form>

                <p className="authHint">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </Card>
        </div>
    );
}
