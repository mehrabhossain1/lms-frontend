"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const router = useRouter();
    const login = useAuth((state) => state.login);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post(
                "https://lms-backend-5lk5.onrender.com/api/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "student", // default role
                }
            );

            // Now auto login after registration
            const loginRes = await axios.post(
                "https://lms-backend-5lk5.onrender.com/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            const { token, user } = loginRes.data;
            login(token, user);

            if (user.role === "admin") router.push("/dashboard/admin");
            else router.push("/dashboard/student");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Registration failed");
            } else {
                setError("Registration failed");
            }
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="mb-4 text-2xl font-bold">Register</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full max-w-xs"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <Button type="submit" className="mt-2">
                    Register
                </Button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
        </main>
    );
}
