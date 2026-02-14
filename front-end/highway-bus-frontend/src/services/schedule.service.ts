import { http } from "../api/http";
import type { BusSchedule } from "../types";

/**
 * Passenger/Public:
 * GET /schedules?from=&to=
 *
 * Admin:
 * GET /admin/schedules
 * POST /admin/schedules
 * PUT /admin/schedules/:id
 * DELETE /admin/schedules/:id
 */
export const scheduleService = {
    async listPublic(from?: string, to?: string) {
        const { data } = await http.get<BusSchedule[]>("/schedules", { params: { from, to } });
        return data;
    },
    async listAdmin() {
        const { data } = await http.get<BusSchedule[]>("/admin/schedules");
        return data;
    },
    async create(payload: Partial<BusSchedule>) {
        const { data } = await http.post<BusSchedule>("/admin/schedules", payload);
        return data;
    },
    async update(id: string, payload: Partial<BusSchedule>) {
        const { data } = await http.put<BusSchedule>(`/admin/schedules/${id}`, payload);
        return data;
    },
    async remove(id: string) {
        await http.delete(`/admin/schedules/${id}`);
    },
};
