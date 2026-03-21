import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

import AdminOrdersClient, { Order } from "./AdminOrdersClient";

export default async function AdminOrdersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const res = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const orders: Order[] = res.ok ? await res.json() : [];

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">จัดการออเดอร์</h1>
                    <p className="page-subtitle">รายการออเดอร์ทั้งหมดในระบบ</p>
                </div>
                <span className="page-badge">{orders.length} รายการ</span>
            </div>

            {/* Interactive Table Client Component */}
            <AdminOrdersClient initialOrders={orders} />
        </div>
    );
}
