"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";

type Student = {
    id: string;
    name: string;
    email: string;
    enrolledCourses: { id: string; title: string }[];
};

export default function AdminStudentsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            router.replace("/login");
            return;
        }
        fetchStudents();
    }, [user]);

    const fetchStudents = async () => {
        try {
            const res = await api.get("/admin/students");
            setStudents(res.data.students);
        } catch (err) {
            setError("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="p-6">Loading students...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Registered Students</h1>
            <ul className="space-y-4">
                {students.map((stu) => (
                    <li key={stu.id} className="border p-4 rounded shadow-sm">
                        <h2 className="font-semibold">{stu.name}</h2>
                        <p>Email: {stu.email}</p>
                        <p>
                            Enrolled Courses:{" "}
                            {stu.enrolledCourses.length > 0
                                ? stu.enrolledCourses
                                      .map((c) => c.title)
                                      .join(", ")
                                : "None"}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
