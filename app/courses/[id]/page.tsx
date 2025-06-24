// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "@/store/auth-store";

// export default function CourseDetailsPage() {
//     const { user, token } = useAuth();
//     const router = useRouter();
//     const params = useParams();
//     const courseId = params?.id;

//     const [course, setCourse] = useState<any>(null);
//     const [enrolled, setEnrolled] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (courseId) {
//             fetchCourse();
//             if (user?.role === "student") {
//                 checkEnrollment();
//             }
//         }
//     }, [courseId, user]);

//     const fetchCourse = async () => {
//         try {
//             const res = await axios.get(
//                 `https://lms-backend-5lk5.onrender.com/api/courses/${courseId}`
//             );
//             setCourse(res.data);
//         } catch (err) {
//             setMessage("Failed to load course.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const checkEnrollment = async () => {
//         try {
//             const res = await axios.get(
//                 `https://lms-backend-5lk5.onrender.com/api/users/enrolled`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             const enrolledIds = res.data.courses.map((c: any) => c._id);
//             setEnrolled(enrolledIds.includes(courseId));
//         } catch (err) {
//             console.error("Enrollment check failed");
//         }
//     };

//     const handleEnroll = async () => {
//         if (!token || !user) {
//             router.push("/login");
//             return;
//         }

//         try {
//             const res = await axios.post(
//                 `https://lms-backend-5lk5.onrender.com/api/users/enroll/${courseId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setEnrolled(true);
//             setMessage("✅ Enrolled successfully!");
//         } catch (err: any) {
//             setMessage(err.response?.data?.message || "Enrollment failed.");
//         }
//     };

//     if (loading) return <div className="p-6">Loading...</div>;
//     if (!course) return <div className="p-6">Course not found</div>;

//     return (
//         <main className="p-6 max-w-2xl mx-auto space-y-4">
//             <h1 className="text-2xl font-bold">{course.title}</h1>
//             <p>{course.description}</p>
//             <p className="text-sm">
//                 Access:{" "}
//                 <span
//                     className={
//                         course.isFree ? "text-green-600" : "text-red-600"
//                     }
//                 >
//                     {course.isFree ? "Free" : `Paid – ৳${course.price}`}
//                 </span>
//             </p>

//             {user?.role === "student" && !enrolled && (
//                 <button
//                     onClick={handleEnroll}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Enroll Now
//                 </button>
//             )}

//             {enrolled && (
//                 <p className="text-green-600 font-medium">
//                     You are already enrolled in this course.
//                 </p>
//             )}

//             {message && <p className="text-sm text-blue-600 mt-2">{message}</p>}
//         </main>
//     );
// }
export default function CourseDetails() {
    return <div>CourseDetails</div>;
}
