"use client";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
    children,
    role,
}: {
    children: React.ReactNode;
    role: "admin" | "student";
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== role)) {
            router.push("/login");
        }
    }, [user, loading, role, router]);

    if (loading || !user)
        return <div className="text-center p-10">Checking auth...</div>;

    return <>{children}</>;
}
