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

type AdminCourseState = {
    courses: Course[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => Promise<void>;
    addCourse: (data: Omit<Course, "_id">) => Promise<void>;
    updateCourse: (id: string, data: Partial<Course>) => Promise<void>;
    deleteCourse: (id: string) => Promise<void>;
};

export const useAdminCourseStore = create<AdminCourseState>((set) => ({
    courses: [],
    loading: false,
    error: null,

    fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get("/courses");
            set({ courses: res.data.courses, loading: false });
        } catch (err) {
            set({ error: getErrorMessage(err), loading: false });
        }
    },

    addCourse: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post("/courses", data);
            set((state) => ({
                courses: [...state.courses, res.data.course], // <-- fix here
                loading: false,
            }));
        } catch (err) {
            set({ error: getErrorMessage(err), loading: false });
        }
    },

    updateCourse: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const res = await api.put(`/courses/${id}`, data);
            set((state) => ({
                courses: state.courses.map((c) =>
                    c._id === id ? res.data.course : c
                ),
                loading: false,
            }));
        } catch (err) {
            set({ error: getErrorMessage(err), loading: false });
        }
    },

    deleteCourse: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/courses/${id}`);
            set((state) => ({
                courses: state.courses.filter((c) => c._id !== id),
                loading: false,
            }));
        } catch (err) {
            set({ error: getErrorMessage(err), loading: false });
        }
    },
}));
