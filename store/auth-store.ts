"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "admin" | "student";

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: true,
            login: (token, user) => set({ user, token, loading: false }),
            logout: () => set({ user: null, token: null, loading: false }),
            setLoading: (loading) => set({ loading }),
        }),
        {
            name: "auth-storage", // localStorage key
        }
    )
);
