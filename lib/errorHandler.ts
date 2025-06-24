import axios from "axios";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || "Something went wrong!";
    }
    return "Something went wrong!";
}
