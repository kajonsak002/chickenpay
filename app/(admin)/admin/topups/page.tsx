import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

import AdminTopUpsClient, { TopUp } from "./AdminTopUpsClient";

export default async function AdminTopUpsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const res = await fetch(`${API_URL}/admin/topups`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const topups: TopUp[] = res.ok ? await res.json() : [];

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">ประวัติการเติมเงิน</h1>
                    <p className="page-subtitle">รายการเติมเงินของผู้ใช้ทั้งหมดในระบบ</p>
                </div>
                <span className="page-badge">{topups.length} รายการ</span>
            </div>

            {/* Interactive Table Client Component */}
            <AdminTopUpsClient initialTopUps={topups} />
        </div>
    );
}
