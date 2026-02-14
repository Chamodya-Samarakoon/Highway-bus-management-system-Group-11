import axios from "axios";
import { authStorage } from "../auth/authStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const http = axios.create({
    baseURL,
});

http.interceptors.request.use((config) => {
    const token = authStorage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.status === 401) {
            authStorage.clearAll();
            // do not hard redirect here; routes will handle it
        }
        return Promise.reject(err);
    }
);
