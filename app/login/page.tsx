"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/store/auth-store";
// import { toast } from "sonner";

// ✅ Validation schema
const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const router = useRouter();
    const login = useAuth((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(
                "https://lms-backend-5lk5.onrender.com/api/auth/login",
                data
            );

            const { token, user } = response.data;

            login(token, user); // Save in zustand store

            alert(`Welcome, ${user.name}`); // Or use alert()

            router.push(
                user.role === "admin"
                    ? "/dashboard/admin"
                    : "/dashboard/student"
            );
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response?.data?.message || "Login failed");
            } else {
                console.error("Login failed");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm shadow-lg">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}

                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
