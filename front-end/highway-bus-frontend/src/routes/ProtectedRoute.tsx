import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../types";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ role }: { role?: Role }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (role && user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
