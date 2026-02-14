import { http } from "../api/http";
import type { Booking } from "../types";

/**
 * Passenger:
 * POST /bookings  { scheduleId, seats[] }
 * GET /bookings/my
 *
 * Admin:
 * GET /admin/bookings
 */
export const bookingService = {
    async create(scheduleId: string, seats: number[]) {
        const { data } = await http.post<Booking>("/bookings", { scheduleId, seats });
        return data;
    },
    async myBookings() {
        const { data } = await http.get<Booking[]>("/bookings/my");
        return data;
    },
    async adminBookings() {
        const { data } = await http.get<Booking[]>("/admin/bookings");
        return data;
    },
};
