import type { User } from "../types";

const TOKEN_KEY = "hb_token";
const USER_KEY = "hb_user";

export const authStorage = {
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    clearToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    getUser(): User | null {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    },
    setUser(user: User) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    clearUser() {
        localStorage.removeItem(USER_KEY);
    },
    clearAll() {
        this.clearToken();
        this.clearUser();
    },
};
