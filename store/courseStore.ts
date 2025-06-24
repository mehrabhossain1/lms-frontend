// store/courseStore.ts
import { create } from "zustand";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errorHandler";

export type Course = {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    videoUrl: string;
    isFree: boolean;
};

type CourseState = {
    enrolledCourses: Course[];
    loading: boolean;
    error: string | null;
    fetchEnrolledCourses: () => Promise<void>;
};

export const useCourseStore = create<CourseState>((set) => ({
    enrolledCourses: [],
    loading: false,
    error: null,

    fetchEnrolledCourses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get("/users/enrolled");
            set({ enrolledCourses: res.data.courses, loading: false });
        } catch (err) {
            const message = getErrorMessage(err);
            set({ error: message, loading: false });
        }
    },
}));
