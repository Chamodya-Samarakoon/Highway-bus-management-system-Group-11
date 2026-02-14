import { http } from "../api/http";
import type { AuthResponse } from "../types";

/**
 * Expected backend responses:
 * POST /auth/login -> { token, user: { id, fullName, email, role } }
 * POST /auth/register -> same
 */
export const authService = {
    async login(email: string, password: string) {
        const { data } = await http.post<AuthResponse>("/auth/login", { email, password });
        return data;
    },
    async register(fullName: string, email: string, password: string) {
        const { data } = await http.post<AuthResponse>("/auth/register", { fullName, email, password });
        return data;
    },
};
