import { useEffect, useState } from "react";
import type { BusSchedule } from "../../types";
import { scheduleService } from "../../services/schedule.service";
import Loading from "../../components/common/Loading";
import AdminTable from "../../components/admin/AdminTable";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";

export default function ManageSchedules() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<BusSchedule[]>([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState<BusSchedule | null>(null);

    const [form, setForm] = useState({
        code: "",
        type: "Express" as "Express" | "Regular",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        priceLkr: 0,
        seatsTotal: 40,
        seatsAvailable: 40,
    });

    const load = async () => {
        try {
            setLoading(true);
            const data = await scheduleService.listAdmin();
            setItems(data);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const startCreate = () => {
        setEdit(null);
        setForm({
            code: "",
            type: "Express",
            from: "",
            to: "",
            departureTime: "",
            arrivalTime: "",
            priceLkr: 0,
            seatsTotal: 40,
            seatsAvailable: 40,
        });
        setOpen(true);
    };

    const startEdit = (s: BusSchedule) => {
        setEdit(s);
        setForm({
            code: s.code,
            type: s.type,
            from: s.from,
            to: s.to,
            departureTime: s.departureTime,
            arrivalTime: s.arrivalTime,
            priceLkr: s.priceLkr,
            seatsTotal: s.seatsTotal,
            seatsAvailable: s.seatsAvailable,
        });
        setOpen(true);
    };

    const save = async () => {
        if (!form.code || !form.from || !form.to) return;
        if (edit) {
            await scheduleService.update(edit.id, form);
        } else {
            await scheduleService.create(form);
        }
        setOpen(false);
        await load();
    };

    const remove = async (id: string) => {
        if (!confirm("Delete this schedule?")) return;
        await scheduleService.remove(id);
        await load();
    };

    return (
        <section className="pageSection">
            <h2 className="pageTitle">Manage Schedules</h2>
            <p className="pageSub">Create / update / delete schedules.</p>

            {loading ? (
                <Loading />
            ) : (
                <AdminTable
                    title="Schedules"
                    columns={["Code", "Type", "From", "To", "Departure", "Arrival", "Price", "Seats", "Actions"]}
                    right={<Button onClick={startCreate}>+ Add Schedule</Button>}
                >
                    {items.map((s) => (
                        <tr key={s.id}>
                            <td>{s.code}</td>
                            <td>{s.type}</td>
                            <td>{s.from}</td>
                            <td>{s.to}</td>
                            <td>{s.departureTime}</td>
                            <td>{s.arrivalTime}</td>
                            <td>LKR {s.priceLkr}</td>
                            <td>
                                {s.seatsAvailable}/{s.seatsTotal}
                            </td>
                            <td className="actions">
                                <Button variant="secondary" onClick={() => startEdit(s)}>Edit</Button>
                                <Button variant="danger" onClick={() => remove(s.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </AdminTable>
            )}

            <Modal open={open} title={edit ? "Edit Schedule" : "Add Schedule"} onClose={() => setOpen(false)}>
                <div className="form">
                    <Input label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                    <label className="field">
                        <span className="field__label">Type</span>
                        <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })}>
                            <option value="Express">Express</option>
                            <option value="Regular">Regular</option>
                        </select>
                    </label>

                    <Input label="From" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
                    <Input label="To" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
                    <Input label="Departure Time" placeholder="08:00 AM" value={form.departureTime} onChange={(e) => setForm({ ...form, departureTime: e.target.value })} />
                    <Input label="Arrival Time" placeholder="12:30 PM" value={form.arrivalTime} onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })} />
                    <Input label="Price (LKR)" type="number" value={form.priceLkr} onChange={(e) => setForm({ ...form, priceLkr: Number(e.target.value) })} />
                    <Input label="Seats Total" type="number" value={form.seatsTotal} onChange={(e) => setForm({ ...form, seatsTotal: Number(e.target.value) })} />
                    <Input label="Seats Available" type="number" value={form.seatsAvailable} onChange={(e) => setForm({ ...form, seatsAvailable: Number(e.target.value) })} />

                    <div className="modalActions">
                        <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={save}>Save</Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
