"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const router = useRouter();

    useEffect(() => {
        setHydrated(true); // Ensure Zustand rehydration completes
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!hydrated) return null;

    const dashboardPath =
        user?.role === "admin" ? "/dashboard/admin" : "/dashboard/student";

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            LearnHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                        <Link href="/courses" className="nav-link">
                            Courses
                        </Link>
                        <Link href="/blogs" className="nav-link">
                            Blogs
                        </Link>
                        {user && (
                            <Link href={dashboardPath} className="nav-link">
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                            </>
                        ) : (
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/courses"
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Courses
                            </Link>
                            <Link
                                href="/blogs"
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blogs
                            </Link>
                            {user && (
                                <Link
                                    href={dashboardPath}
                                    className="nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}

                            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {!user ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            asChild
                                            className="justify-start"
                                        >
                                            <Link
                                                href="/login"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Login
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="justify-start"
                                        >
                                            <Link
                                                href="/register"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Register
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="justify-start"
                                    >
                                        Logout
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
