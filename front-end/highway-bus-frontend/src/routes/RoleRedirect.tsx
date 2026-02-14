import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RoleRedirect() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/" replace />;

    if (user?.role === "ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/app" replace />;
}
