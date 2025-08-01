"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";

export default function LoginPage() {
    const login = useAuth((state) => state.login);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                "https://lms-backend-5lk5.onrender.com/api/auth/login",
                {
                    email,
                    password,
                }
            );

            const { token, user } = res.data;
            login(token, user);

            if (user.role === "admin") router.push("/dashboard/admin");
            else router.push("/dashboard/student");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="mb-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded w-full max-w-xs">
                <p className="font-semibold mb-2">🔑 Test Credentials</p>
                <p>
                    <strong>Admin:</strong>
                    <br />
                    <code>admin@gmail.com</code>
                    <br />
                    <code>123456</code>
                </p>
                <p className="mt-2">
                    <strong>Student:</strong>
                    <br />
                    <code>student@gmail.com</code>
                    <br />
                    <code>123456</code>
                </p>
            </div>
            <h1 className="mb-4 text-2xl font-bold">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full max-w-xs"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded mt-2"
                >
                    Login
                </button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
        </main>
    );
}
