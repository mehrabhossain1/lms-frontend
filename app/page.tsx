import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Clock, BookOpen, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample data - replace with your backend data
const featuredFreeCourses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the basics of HTML, CSS, and JavaScript",
        instructor: "John Doe",
        duration: "4 hours",
        students: 1250,
        rating: 4.8,
        image: "/placeholder.svg?height=200&width=300",
        progress: 0,
    },
    {
        id: 2,
        title: "Python Fundamentals",
        description: "Master Python programming from scratch",
        instructor: "Jane Smith",
        duration: "6 hours",
        students: 980,
        rating: 4.9,
        image: "/placeholder.svg?height=200&width=300",
        progress: 0,
    },
    {
        id: 3,
        title: "Digital Marketing Basics",
        description: "Learn essential digital marketing strategies",
        instructor: "Mike Johnson",
        duration: "3 hours",
        students: 750,
        rating: 4.7,
        image: "/placeholder.svg?height=200&width=300",
        progress: 0,
    },
];

const featuredPaidCourses = [
    {
        id: 4,
        title: "Advanced React Development",
        description: "Build complex applications with React and Next.js",
        instructor: "Sarah Wilson",
        duration: "12 hours",
        students: 450,
        rating: 4.9,
        price: 99,
        originalPrice: 149,
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 5,
        title: "Full-Stack Development Bootcamp",
        description: "Complete MERN stack development course",
        instructor: "David Brown",
        duration: "40 hours",
        students: 320,
        rating: 4.8,
        price: 199,
        originalPrice: 299,
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        id: 6,
        title: "UI/UX Design Masterclass",
        description: "Design beautiful and functional user interfaces",
        instructor: "Emily Davis",
        duration: "15 hours",
        students: 280,
        rating: 4.9,
        price: 129,
        originalPrice: 179,
        image: "/placeholder.svg?height=200&width=300",
    },
];

const testimonials = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Software Developer",
        content:
            "This platform transformed my career. The courses are well-structured and the instructors are top-notch.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
    },
    {
        id: 2,
        name: "Maria Garcia",
        role: "Product Manager",
        content:
            "I love the flexibility of learning at my own pace. The content quality is exceptional.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
    },
    {
        id: 3,
        name: "James Wilson",
        role: "Freelancer",
        content:
            "The practical projects helped me build a strong portfolio. Highly recommended!",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Learn Without
                                    <span className="text-blue-600 dark:text-blue-400">
                                        {" "}
                                        Limits
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Access thousands of courses from expert
                                    instructors and advance your skills at your
                                    own pace.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="text-lg px-8 py-6">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Start Learning Today
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-6 bg-white dark:bg-gray-800"
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Watch Demo
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        50K+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Students
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        1K+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Courses
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        100+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Instructors
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/placeholder.svg?height=500&width=600"
                                alt="Learning illustration"
                                width={600}
                                height={500}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Free Courses */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Featured Free Courses
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Start your learning journey with our carefully
                            selected free courses
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredFreeCourses.map((course) => (
                            <Card
                                key={course.id}
                                className="group hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <Image
                                        src={course.image || "/placeholder.svg"}
                                        alt={course.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                                        FREE
                                    </Badge>
                                </div>

                                <CardHeader>
                                    <CardTitle className="line-clamp-2">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {course.students.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {course.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">
                                                {course.rating}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            by {course.instructor}
                                        </span>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button className="w-full">
                                        Enroll Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            View All Free Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Paid Courses */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Premium Courses
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Advance your skills with our comprehensive premium
                            courses
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredPaidCourses.map((course) => (
                            <Card
                                key={course.id}
                                className="group hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <Image
                                        src={course.image || "/placeholder.svg"}
                                        alt={course.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600">
                                        PREMIUM
                                    </Badge>
                                </div>

                                <CardHeader>
                                    <CardTitle className="line-clamp-2">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {course.students.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {course.duration}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">
                                                {course.rating}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            by {course.instructor}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                            ${course.price}
                                        </span>
                                        <span className="text-lg text-gray-500 line-through">
                                            ${course.originalPrice}
                                        </span>
                                        <Badge
                                            variant="secondary"
                                            className="ml-auto"
                                        >
                                            {Math.round(
                                                (1 -
                                                    course.price /
                                                        course.originalPrice) *
                                                    100
                                            )}
                                            % OFF
                                        </Badge>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button className="w-full">
                                        Enroll Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            View All Premium Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What Our Students Say
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Join thousands of satisfied learners who have
                            transformed their careers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="text-center">
                                <CardContent className="pt-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                                />
                                            )
                                        )}
                                    </div>

                                    <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                                        &quot;{testimonial.content}&quot;
                                    </blockquote>

                                    <div className="flex items-center justify-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    testimonial.avatar ||
                                                    "/placeholder.svg"
                                                }
                                                alt={testimonial.name}
                                            />
                                            <AvatarFallback>
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white">
                            Ready to Start Your Learning Journey?
                        </h2>
                        <p className="text-xl text-blue-100">
                            Join our community of learners and unlock your
                            potential with our comprehensive courses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg px-8 py-6"
                            >
                                Get Started Free
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600"
                            >
                                View Pricing
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">LearnHub</h3>
                            <p className="text-gray-400">
                                Empowering learners worldwide with quality
                                education and practical skills.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Courses</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Web Development
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Data Science
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Design
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Business
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Refund Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} LearnHub. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
