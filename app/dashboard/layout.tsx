"use client";

import Link from "next/link";
import { useAuth } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    const adminLinks = [
        { href: "/dashboard/admin", label: "Dashboard" },
        { href: "/dashboard/admin/courses", label: "Manage Courses" },
        { href: "/dashboard/admin/students", label: "Students" },
        { href: "/dashboard/admin/reviews", label: "Reviews" },
    ];

    const studentLinks = [
        { href: "/dashboard/student", label: "Dashboard" },
        { href: "/dashboard/student/courses", label: "My Courses" },
        { href: "/dashboard/student/progress", label: "Progress" },
        { href: "/dashboard/student/reviews", label: "My Reviews" },
    ];

    const links = user.role === "admin" ? adminLinks : studentLinks;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-100 p-4 border-r">
                <h2 className="text-xl font-semibold mb-6">📚 LMS Dashboard</h2>

                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded hover:bg-gray-200 ${
                                pathname === link.href
                                    ? "bg-gray-300 font-medium"
                                    : ""
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <Button
                        variant="outline"
                        className="mt-6"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </nav>
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
