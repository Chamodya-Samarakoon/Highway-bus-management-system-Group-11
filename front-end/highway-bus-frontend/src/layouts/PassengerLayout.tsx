import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function PassengerLayout() {
    return (
        <>
            <Navbar variant="passenger" />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}
