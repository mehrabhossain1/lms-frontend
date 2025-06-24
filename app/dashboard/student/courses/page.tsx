"use client";

import { useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";

export default function EnrolledCoursesPage() {
    const { enrolledCourses, fetchEnrolledCourses, loading, error } =
        useCourseStore();

    useEffect(() => {
        fetchEnrolledCourses();
    }, [fetchEnrolledCourses]);

    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Enrolled Courses</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {enrolledCourses.length === 0 && !loading && (
                <p>You haven't enrolled in any courses yet.</p>
            )}

            <div className="space-y-4">
                {enrolledCourses.map((course) => (
                    <div
                        key={course._id}
                        className="border p-4 rounded shadow-sm flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold">
                            {course.title}
                        </h2>
                        <p>{course.description}</p>
                        <iframe
                            src={course.videoUrl}
                            className="w-full aspect-video mt-2"
                            allowFullScreen
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
