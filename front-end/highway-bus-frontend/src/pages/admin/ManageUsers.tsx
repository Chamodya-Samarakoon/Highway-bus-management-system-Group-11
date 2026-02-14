import AdminTable from "../../components/admin/AdminTable";

/**
 * If you already have backend endpoints:
 * GET /admin/users -> list users
 * You can implement exactly like ManageBookings.
 *
 * For now, this is a ready page skeleton.
 */
export default function ManageUsers() {
    return (
        <section className="pageSection">
            <h2 className="pageTitle">Manage Users</h2>
            <p className="pageSub">List passenger accounts (connect to your backend endpoint).</p>

            <AdminTable title="Users" columns={["Name", "Email", "Role", "Actions"]}>
                <tr>
                    <td colSpan={4} className="muted">Connect your backend endpoint to load users.</td>
                </tr>
            </AdminTable>
        </section>
    );
}
