import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PassengerLayout from "../layouts/PassengerLayout";
import AdminLayout from "../layouts/AdminLayout";

import ViewSchedules from "../pages/public/ViewSchedules";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import FeedbackPublic from "../pages/public/FeedbackPublic";

import BookTickets from "../pages/passenger/BookTickets";
import BookingCheckout from "../pages/passenger/BookingCheckout";
import MyBookings from "../pages/passenger/MyBookings";
import SubmitFeedback from "../pages/passenger/SubmitFeedback";
import MyFeedback from "../pages/passenger/MyFeedback";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageSchedules from "../pages/admin/ManageSchedules";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageFeedback from "../pages/admin/ManageFeedback";

import ProtectedRoute from "./ProtectedRoute";
import RoleRedirect from "./RoleRedirect";

export default function AppRoutes() {
    return (
        <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<ViewSchedules />} />
                <Route path="/schedules" element={<ViewSchedules />} />
                <Route path="/feedback" element={<FeedbackPublic />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/redirect" element={<RoleRedirect />} />
            </Route>

            {/* PASSENGER PROTECTED ROUTES */}
            <Route element={<ProtectedRoute role="PASSENGER" />}>
                <Route element={<PassengerLayout />}>
                    <Route path="/app" element={<BookTickets />} />
                    <Route path="/app/checkout/:scheduleId" element={<BookingCheckout />} />
                    <Route path="/app/bookings" element={<MyBookings />} />
                    <Route path="/app/feedback" element={<SubmitFeedback />} />
                    <Route path="/app/my-feedback" element={<MyFeedback />} />
                </Route>
            </Route>

            {/* ADMIN PROTECTED ROUTES */}
            <Route element={<ProtectedRoute role="ADMIN" />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/schedules" element={<ManageSchedules />} />
                    <Route path="/admin/bookings" element={<ManageBookings />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/feedback" element={<ManageFeedback />} />
                </Route>
            </Route>

            {/* Fallback for 404s */}
            <Route path="*" element={<ViewSchedules />} />
        </Routes>
    );
}