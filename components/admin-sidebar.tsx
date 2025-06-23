"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    Users,
    Star,
    BarChart3,
    Settings,
    Menu,
    X,
    Home,
    MessageSquare,
    DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
    },
    {
        title: "Students",
        href: "/admin/students",
        icon: Users,
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "Revenue",
        href: "/admin/revenue",
        icon: DollarSign,
    },
    {
        title: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div
            className={cn(
                "relative flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Admin Panel
                        </span>
                    </div>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="h-8 w-8 p-0"
                >
                    {isCollapsed ? (
                        <Menu className="h-4 w-4" />
                    ) : (
                        <X className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                                        isCollapsed && "justify-center"
                                    )}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    {!isCollapsed && <span>{item.title}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div
                    className={cn(
                        "flex items-center gap-3",
                        isCollapsed && "justify-center"
                    )}
                >
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            A
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Admin User
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                admin@example.com
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
