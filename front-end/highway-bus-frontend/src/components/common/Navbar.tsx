import { Link, NavLink, useNavigate } from "react-router-dom";
import { CalendarDays, MessageSquareText, LogIn, UserPlus, Ticket, LayoutDashboard, Users, ClipboardList, LogOut } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

type Props = {
    variant: "public" | "passenger" | "admin";
};

export default function Navbar({ variant }: Props) {
    const { isAuthenticated, user, logout } = useAuth();
    const nav = useNavigate();

    const onLogout = () => {
        logout();
        nav("/");
    };

    return (
        <header className="topbar">
            <div className="topbar__inner">
                <Link to="/" className="brand">
                    <span className="brand__icon">🚌</span>
                    <span className="brand__text">Tansvia</span>
                </Link>

                <nav className="nav">
                    {(variant === "public" || variant === "passenger") && (
                        <>
                            <NavLink className="nav__item" to={variant === "passenger" ? "/app" : "/schedules"}>
                                <CalendarDays size={18} /> Schedules
                            </NavLink>

                            <NavLink className="nav__item" to={variant === "passenger" ? "/app/feedback" : "/feedback"}>
                                <MessageSquareText size={18} /> Feedback
                            </NavLink>
                        </>
                    )}

                    {variant === "passenger" && (
                        <>
                            <NavLink className="nav__item" to="/app/bookings">
                                <Ticket size={18} /> My Bookings
                            </NavLink>
                            <NavLink className="nav__item" to="/app/my-feedback">
                                <ClipboardList size={18} /> My Feedback
                            </NavLink>
                        </>
                    )}

                    {variant === "admin" && (
                        <>
                            <NavLink className="nav__item" to="/admin">
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                            <NavLink className="nav__item" to="/admin/schedules">
                                <CalendarDays size={18} /> Schedules
                            </NavLink>
                            <NavLink className="nav__item" to="/admin/bookings">
                                <Ticket size={18} /> Bookings
                            </NavLink>
                            <NavLink className="nav__item" to="/admin/users">
                                <Users size={18} /> Users
                            </NavLink>
                            <NavLink className="nav__item" to="/admin/feedback">
                                <MessageSquareText size={18} /> Feedback
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="topbar__right">
                    {!isAuthenticated && variant === "public" && (
                        <>
                            <Link className="pill" to="/login"><LogIn size={18} /> Login</Link>
                            <Link className="pill pill--light" to="/register"><UserPlus size={18} /> Register</Link>
                        </>
                    )}

                    {isAuthenticated && user && (
                        <>
                            <div className="welcome">
                                <span className="welcome__text">Welcome, {user.fullName.split(" ")[0]}</span>
                                <span className={`role role--${user.role.toLowerCase()}`}>{user.role === "ADMIN" ? "Admin" : "Passenger"}</span>
                            </div>
                            <button className="pill pill--danger" onClick={onLogout}>
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
