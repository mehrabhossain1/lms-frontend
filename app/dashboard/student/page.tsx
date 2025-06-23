import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Target, Play, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with your backend data
const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "January 2024",
    totalCourses: 5,
    completedCourses: 2,
    totalHours: 45,
    certificates: 2,
};

const enrolledCourses = [
    {
        id: 1,
        title: "Advanced React Development",
        instructor: "Sarah Wilson",
        thumbnail: "/placeholder.svg?height=100&width=150",
        progress: 75,
        totalLessons: 24,
        completedLessons: 18,
        lastAccessed: "2 hours ago",
        estimatedTime: "2h left",
        category: "Web Development",
    },
    {
        id: 2,
        title: "Python Fundamentals",
        instructor: "Jane Smith",
        thumbnail: "/placeholder.svg?height=100&width=150",
        progress: 100,
        totalLessons: 16,
        completedLessons: 16,
        lastAccessed: "1 week ago",
        estimatedTime: "Completed",
        category: "Programming",
        completed: true,
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        instructor: "Emily Davis",
        thumbnail: "/placeholder.svg?height=100&width=150",
        progress: 30,
        totalLessons: 20,
        completedLessons: 6,
        lastAccessed: "3 days ago",
        estimatedTime: "8h left",
        category: "Design",
    },
    {
        id: 4,
        title: "Digital Marketing Basics",
        instructor: "Mike Johnson",
        thumbnail: "/placeholder.svg?height=100&width=150",
        progress: 60,
        totalLessons: 12,
        completedLessons: 7,
        lastAccessed: "1 day ago",
        estimatedTime: "3h left",
        category: "Marketing",
    },
    {
        id: 5,
        title: "Full-Stack Development Bootcamp",
        instructor: "David Brown",
        thumbnail: "/placeholder.svg?height=100&width=150",
        progress: 15,
        totalLessons: 40,
        completedLessons: 6,
        lastAccessed: "5 days ago",
        estimatedTime: "35h left",
        category: "Web Development",
    },
];

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {studentData.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Continue your learning journey and achieve your goals.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Total Courses
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {studentData.totalCourses}
                                    </p>
                                </div>
                                <BookOpen className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Completed
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {studentData.completedCourses}
                                    </p>
                                </div>
                                <Trophy className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Learning Hours
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {studentData.totalHours}h
                                    </p>
                                </div>
                                <Clock className="h-8 w-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Certificates
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {studentData.certificates}
                                    </p>
                                </div>
                                <Target className="h-8 w-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Enrolled Courses */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    My Courses
                                </CardTitle>
                                <CardDescription>
                                    Continue learning from where you left off
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {enrolledCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Image
                                            src={
                                                course.thumbnail ||
                                                "/placeholder.svg"
                                            }
                                            alt={course.title}
                                            width={80}
                                            height={60}
                                            className="rounded-md object-cover"
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-sm line-clamp-1">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        by {course.instructor}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {course.category}
                                                </Badge>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>
                                                        {
                                                            course.completedLessons
                                                        }
                                                        /{course.totalLessons}{" "}
                                                        lessons
                                                    </span>
                                                    <span>
                                                        {course.estimatedTime}
                                                    </span>
                                                </div>

                                                <Progress
                                                    value={course.progress}
                                                    className="h-2"
                                                />

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        Last accessed:{" "}
                                                        {course.lastAccessed}
                                                    </span>
                                                    <span className="text-xs font-medium">
                                                        {course.progress}%
                                                        complete
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant={
                                                course.completed
                                                    ? "secondary"
                                                    : "default"
                                            }
                                            asChild
                                        >
                                            <Link
                                                href={`/courses/${course.id}`}
                                            >
                                                {course.completed ? (
                                                    <>
                                                        <Trophy className="h-4 w-4 mr-1" />
                                                        Review
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-4 w-4 mr-1" />
                                                        Continue
                                                    </>
                                                )}
                                            </Link>
                                        </Button>
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link href="/courses">
                                            Browse More Courses
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Section */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={
                                                studentData.avatar ||
                                                "/placeholder.svg"
                                            }
                                            alt={studentData.name}
                                        />
                                        <AvatarFallback className="text-lg">
                                            {studentData.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">
                                            {studentData.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {studentData.email}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                            <Calendar className="h-3 w-3" />
                                            Joined {studentData.joinDate}
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Learning Goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Monthly Goal</span>
                                        <span className="font-medium">
                                            20h / 25h
                                        </span>
                                    </div>
                                    <Progress value={80} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Course Completion</span>
                                        <span className="font-medium">
                                            2 / 3 courses
                                        </span>
                                    </div>
                                    <Progress value={67} className="h-2" />
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    Update Goals
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Recent Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                        <Trophy className="h-4 w-4 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Course Completed
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Python Fundamentals
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Target className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Streak Milestone
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            7 days learning streak
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    View All Achievements
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
