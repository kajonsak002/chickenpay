import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

import AdminUsersClient, { User } from "./AdminUsersClient";

export default async function AdminUsersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const users: User[] = res.ok ? await res.json() : [];

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">จัดการผู้ใช้งาน</h1>
                    <p className="page-subtitle">รายการผู้ใช้ทั้งหมดในระบบ ChickenPay</p>
                </div>
                <span className="page-badge">{users.length} บัญชี</span>
            </div>

            {/* Interactive Table Client Component */}
            <AdminUsersClient initialUsers={users} />
        </div>
    );
}
