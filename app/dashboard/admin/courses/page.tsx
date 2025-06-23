"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";

type Course = {
    _id: string;
    title: string;
    description: string;
    isFree: boolean;
    price: number;
};

export default function AdminCoursesPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            router.replace("/login");
        } else {
            fetchCourses();
        }
    }, [user, router]);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(
                "https://lms-backend-5lk5.onrender.com/api/courses"
            );
            setCourses(res.data.courses);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Failed to fetch courses"
                );
            } else {
                setError("Failed to fetch courses");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;

        try {
            await axios.delete(
                `https://lms-backend-5lk5.onrender.com/api/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCourses(courses.filter((course) => course._id !== id));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Failed to delete course"
                );
            } else {
                setError("Failed to delete course");
            }
            alert("Delete failed.");
        }
    };

    if (loading) return <p className="p-6">Loading courses...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

            <Link
                href="/dashboard/admin/courses/new"
                className="bg-green-600 text-white px-4 py-2 rounded inline-block mb-4"
            >
                + Add New Course
            </Link>

            <ul className="space-y-4">
                {courses.map((course) => (
                    <li
                        key={course._id}
                        className="border p-4 rounded shadow-sm"
                    >
                        <h2 className="text-lg font-semibold">
                            {course.title}
                        </h2>
                        <p>{course.description}</p>
                        <p className="text-sm">
                            Access:{" "}
                            {course.isFree ? "Free" : `Paid – ৳${course.price}`}
                        </p>
                        <div className="mt-2 space-x-2">
                            <Link
                                href={`/dashboard/admin/courses/edit/${course._id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(course._id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
