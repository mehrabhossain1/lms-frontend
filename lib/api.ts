import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
        : process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ...existing code...
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("auth-storage");
            if (userData) {
                try {
                    const parsed = JSON.parse(userData);
                    const token = parsed?.state?.token;
                    if (token) {
                        // Set the header directly, do not assign a new object!
                        config.headers = config.headers || {};
                        // For Axios v1+, this is safe:
                        if (
                            typeof config.headers === "object" &&
                            config.headers !== null
                        ) {
                            (config.headers as Record<string, string>)[
                                "Authorization"
                            ] = `Bearer ${token}`;
                        }
                    }
                } catch {
                    // ignore JSON parse errors
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// ...existing code...
