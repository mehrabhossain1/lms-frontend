// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "@/store/auth-store";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function MyCoursesPage() {
//     const { user, token } = useAuth();
//     const router = useRouter();
//     const [courses, setCourses] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!user || user.role !== "student") {
//             router.replace("/login");
//         } else {
//             fetchEnrolledCourses();
//         }
//     }, [user]);

//     const fetchEnrolledCourses = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:7001/api/users/enrolled",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setCourses(res.data.courses);
//         } catch (err) {
//             setError("Failed to fetch enrolled courses");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <p className="p-6">Loading your courses...</p>;
//     if (error) return <p className="p-6 text-red-600">{error}</p>;
//     if (!courses.length)
//         return <p className="p-6">You haven't enrolled in any courses yet.</p>;

//     return (
//         <main className="p-6">
//             <h1 className="text-2xl font-bold mb-4">My Enrolled Courses</h1>
//             <ul className="space-y-4">
//                 {courses.map((course) => (
//                     <li
//                         key={course._id}
//                         className="border p-4 rounded shadow-sm"
//                     >
//                         <h2 className="text-lg font-semibold">
//                             {course.title}
//                         </h2>
//                         <p className="text-sm">{course.description}</p>
//                         <p className="text-xs text-gray-500 mt-1">
//                             {course.category}
//                         </p>
//                         <Link
//                             href={`/courses/${course._id}`}
//                             className="text-blue-600 text-sm underline mt-2 inline-block"
//                         >
//                             View Course
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </main>
//     );
// }

export default function StudentCourses() {
    return <div>StudentCourses</div>;
}
