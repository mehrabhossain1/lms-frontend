"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useAdminCourseStore, type Course } from "@/store/adminCourseStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    BookOpen,
    Users,
    DollarSign,
    Video,
} from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const courseSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be less than 500 characters"),
    category: z.string().min(1, "Category is required"),
    videoUrl: z
        .string()
        .url("Please enter a valid URL")
        .min(1, "Video URL is required"),
    price: z.number().min(0, "Price must be 0 or greater"),
    isFree: z.boolean(),
});

type FormValues = z.infer<typeof courseSchema>;

const categories = [
    "Web Development",
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Data Science",
    "Mobile Development",
    "DevOps",
];

export default function AdminCoursesPage() {
    const { user } = useAuth();
    const router = useRouter();

    const {
        courses,
        loading,
        error,
        fetchCourses,
        addCourse,
        updateCourse,
        deleteCourse,
    } = useAdminCourseStore();

    const [modalOpen, setModalOpen] = useState(false);
    const [editCourse, setEditCourse] = useState<Course | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            videoUrl: "",
            price: 0,
            isFree: false,
        },
    });

    const isFree = form.watch("isFree");

    useEffect(() => {
        if (!user || user.role !== "admin") {
            router.replace("/login");
        } else {
            fetchCourses();
        }
    }, [user, router, fetchCourses]);

    // Filter courses
    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "all" || course.category === categoryFilter;

        const matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "free" && course.isFree) ||
            (priceFilter === "paid" && !course.isFree);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Open modal for add or edit
    const openModal = (course?: Course) => {
        setEditCourse(course || null);
        if (course) {
            form.reset({
                title: course.title,
                description: course.description,
                category: course.category,
                videoUrl: course.videoUrl,
                price: course.price,
                isFree: course.isFree,
            });
        } else {
            form.reset({
                title: "",
                description: "",
                category: "",
                videoUrl: "",
                price: 0,
                isFree: false,
            });
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditCourse(null);
        form.reset();
        setIsSubmitting(false);
    };

    // Handle form submit for add or edit
    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);
            if (editCourse) {
                await updateCourse(editCourse._id, data);
                toast.success("Course updated successfully!");
            } else {
                await addCourse(data);
                toast.success("Course created successfully!");
            }
            closeModal();
        } catch (error) {
            console.error("Error submitting course:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        try {
            await deleteCourse(id);
            toast.success(`"${title}" has been deleted successfully!`);
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course. Please try again.");
        }
    };

    const uniqueCategories = Array.from(
        new Set(courses.map((course) => course.category).filter(Boolean))
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Manage Courses
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Create, edit, and manage your courses
                    </p>
                </div>

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => openModal()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Course
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editCourse ? "Edit Course" : "Add New Course"}
                            </DialogTitle>
                            <DialogDescription>
                                {editCourse
                                    ? "Update the course information below."
                                    : "Fill in the details to create a new course."}
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter course title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter course description"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category
                                                                    }
                                                                    value={
                                                                        category
                                                                    }
                                                                >
                                                                    {category}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://example.com/video"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="isFree"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Free Course
                                                </FormLabel>
                                                <FormDescription>
                                                    Make this course available
                                                    for free to all users
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {!isFree && (
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (৳)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                Number.parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || 0
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Set the price for this
                                                    course in Bangladeshi Taka
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <LoadingSpinner
                                                size="sm"
                                                className="mr-2"
                                            />
                                        )}
                                        {editCourse
                                            ? "Update Course"
                                            : "Create Course"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Error Display */}
            {error && <ErrorMessage message={error} />}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Courses
                                </p>
                                <p className="text-2xl font-bold">
                                    {courses.length}
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
                                    Free Courses
                                </p>
                                <p className="text-2xl font-bold">
                                    {courses.filter((c) => c.isFree).length}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Paid Courses
                                </p>
                                <p className="text-2xl font-bold">
                                    {courses.filter((c) => !c.isFree).length}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select
                            value={categoryFilter}
                            onValueChange={setCategoryFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {uniqueCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={priceFilter}
                            onValueChange={setPriceFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Prices</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Course List */}
            <div className="grid gap-6">
                {filteredCourses.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                                {courses.length === 0
                                    ? "No courses found"
                                    : "No courses match your filters"}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {courses.length === 0
                                    ? "Create your first course to get started!"
                                    : "Try adjusting your search criteria"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredCourses.map((course) => (
                        <Card
                            key={course._id}
                            className="hover:shadow-md transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-xl">
                                                {course.title}
                                            </CardTitle>
                                            {course.isFree ? (
                                                <Badge className="bg-green-500 hover:bg-green-600">
                                                    FREE
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    ৳{course.price}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="text-sm">
                                            {course.description}
                                        </CardDescription>
                                    </div>

                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(course)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Delete Course
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to
                                                        delete &quot;
                                                        {course.title}&quot;?
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                course._id,
                                                                course.title
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            {course.category}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Video className="h-4 w-4" />
                                        <span>Video Course</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span>Access:</span>
                                        <span className="font-medium">
                                            {course.isFree
                                                ? "Free"
                                                : `৳${course.price}`}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
