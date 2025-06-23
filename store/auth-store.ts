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
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);
