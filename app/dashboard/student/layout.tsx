"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else if (user.role !== "student") {
            router.replace("/dashboard/admin");
        }
    }, [user, router]);

    if (!user || user.role !== "student") return null;

    return <>{children}</>;
}
