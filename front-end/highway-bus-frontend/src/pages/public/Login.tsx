import { useState } from "react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../../assets/login.jpg";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        setBusy(true);
        try {
            const user = await login(email, password);
            nav(user.role === "ADMIN" ? "/admin" : "/app");
        } catch (ex: any) {
            setErr(ex?.response?.data?.message || "Login failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="authWrap">
            <div className="authLeft">
                <img src={loginImg} className="authImage" alt="login" />
                <div className="authImageOverlay">
                    <h2>Welcome Back!</h2>
                    <p>Login to book your bus tickets and manage your bookings</p>
                </div>
            </div>

            <Card className="authCard">
                <h2 className="authTitle">Login</h2>
                {err && <div className="alert">{err}</div>}

                <form onSubmit={onSubmit} className="form">
                    <Input label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button disabled={busy} type="submit" className="full">
                        {busy ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="authHint">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </Card>
        </div>
    );
}
