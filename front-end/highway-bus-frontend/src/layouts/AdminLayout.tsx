import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function AdminLayout() {
    return (
        <>
            <Navbar variant="admin" />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}
