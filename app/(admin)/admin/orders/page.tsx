import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

const STATUS_LABEL: Record<string, string> = {
    COMPLETED: "สำเร็จ",
    PENDING: "รอดำเนินการ",
    CANCELLED: "ยกเลิก",
    PAID: "ชำระแล้ว",
    DELIVERED: "จัดส่งแล้ว",
};
const STATUS_CLS: Record<string, string> = {
    COMPLETED: "badge-green",
    PENDING: "badge-yellow",
    CANCELLED: "badge-red",
    PAID: "badge-blue",
    DELIVERED: "badge-purple",
};

type OrderItem = { product?: { name?: string } };
type Order = {
    id: string;
    user?: { email?: string };
    items?: OrderItem[];
    totalAmount: string;
    status: string;
    createdAt: string;
};

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

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header">
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-green" />
                        รายการออเดอร์
                    </span>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>รหัสออเดอร์</th>
                                <th>อีเมลผู้ใช้</th>
                                <th>สินค้า</th>
                                <th>ยอดรวม</th>
                                <th>สถานะ</th>
                                <th>วันที่สั่ง</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลออเดอร์</td></tr>
                            ) : orders.map((o) => (
                                <tr key={o.id}>
                                    <td><span className="mono-id">#{o.id.slice(0, 8).toUpperCase()}</span></td>
                                    <td className="cell-email">{o.user?.email ?? '-'}</td>
                                    <td className="cell-truncate cell-muted">
                                        {o.items?.map(i => i.product?.name).filter(Boolean).join(', ').slice(0, 48) || '-'}
                                    </td>
                                    <td className="amount-pos">฿{parseFloat(o.totalAmount).toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${STATUS_CLS[o.status] ?? 'badge-gray'}`}>
                                            {STATUS_LABEL[o.status] ?? o.status}
                                        </span>
                                    </td>
                                    <td className="cell-muted">
                                        {new Date(o.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
