import { http } from "../api/http";
import type { Feedback } from "../types";

/**
 * Passenger:
 * POST /feedback
 * GET /feedback/my
 *
 * Public (optional):
 * POST /feedback/public
 *
 * Admin:
 * GET /admin/feedback
 * PUT /admin/feedback/:id
 */
export const feedbackService = {
    async submit(payload: Omit<Feedback, "id" | "createdAt" | "status">) {
        const { data } = await http.post<Feedback>("/feedback", payload);
        return data;
    },
    async myFeedback() {
        const { data } = await http.get<Feedback[]>("/feedback/my");
        return data;
    },
    async adminFeedback() {
        const { data } = await http.get<Feedback[]>("/admin/feedback");
        return data;
    },
    async updateStatus(id: string, status: string) {
        const { data } = await http.put<Feedback>(`/admin/feedback/${id}`, { status });
        return data;
    },
};
