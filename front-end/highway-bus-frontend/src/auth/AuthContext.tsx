import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role, User } from "../types";
import { authStorage } from "./authStorage";
import { authService } from "../services/auth.service";

type AuthState = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (fullName: string, email: string, password: string) => Promise<User>;
    logout: () => void;
    hasRole: (role: Role) => boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(authStorage.getToken());
    const [user, setUser] = useState<User | null>(authStorage.getUser());

    useEffect(() => {
        setToken(authStorage.getToken());
        setUser(authStorage.getUser());
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authService.login(email, password);
        authStorage.setToken(res.token);
        authStorage.setUser(res.user);
        setToken(res.token);
        setUser(res.user);
        return res.user;
    };

    const register = async (fullName: string, email: string, password: string) => {
        const res = await authService.register(fullName, email, password);
        authStorage.setToken(res.token);
        authStorage.setUser(res.user);
        setToken(res.token);
        setUser(res.user);
        return res.user;
    };

    const logout = () => {
        authStorage.clearAll();
        setToken(null);
        setUser(null);
    };

    const hasRole = (role: Role) => user?.role === role;

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: !!token && !!user,
            login,
            register,
            logout,
            hasRole,
        }),
        [token, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
