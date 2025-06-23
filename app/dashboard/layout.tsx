"use client";

import Link from "next/link";
import { useAuth } from "@/store/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const router = useRouter();
    const pathname = usePathname();

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated && !user) {
            router.push("/login");
        }
    }, [hydrated, user, router]);

    if (!hydrated) return <div className="p-10 text-center">Loading...</div>;
    if (!user) return null;

    const adminLinks = [
        { href: "/dashboard/admin", label: "Dashboard" },
        { href: "/dashboard/admin/courses", label: "Manage Courses" },
        { href: "/dashboard/admin/students", label: "Students" },
    ];

    const studentLinks = [
        { href: "/dashboard/student", label: "Dashboard" },
        { href: "/dashboard/student/courses", label: "My Courses" },
        { href: "/dashboard/student/progress", label: "Progress" },
    ];

    const links = user.role === "admin" ? adminLinks : studentLinks;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-100 p-4 border-r">
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

                <nav className="flex flex-col gap-3">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded hover:bg-gray-200 ${
                                pathname === link.href
                                    ? "bg-gray-300 font-semibold"
                                    : ""
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="mt-6 px-3 py-2 rounded border border-gray-400 hover:bg-gray-200"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
