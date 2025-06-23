"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else if (user.role !== "admin") {
            router.replace("/dashboard/student");
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    return <>{children}</>;
}
