// app/dashboard/admin/page.tsx
import AuthGuard from "@/components/auth-guard";

export default function AdminDashboardPage() {
    return (
        <AuthGuard role="admin">
            <div className="p-4">Your admin content here</div>
        </AuthGuard>
    );
}
