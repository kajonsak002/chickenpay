import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

const TOPUP_STATUS: Record<string, { label: string; cls: string }> = {
    CREDITED: { label: "เติมเงินสำเร็จ", cls: "badge-green" },
    PENDING:  { label: "รอดำเนินการ",   cls: "badge-yellow" },
    FAILED:   { label: "ล้มเหลว",        cls: "badge-red" },
    REJECTED: { label: "ถูกปฏิเสธ",     cls: "badge-red" },
};

type TopUp = {
    id: string;
    user?: { email?: string };
    amount: string;
    provider?: string;
    status: string;
    createdAt: string;
};

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

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header">
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-orange" />
                        รายการเติมเงิน
                    </span>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>รหัส</th>
                                <th>อีเมลผู้ใช้</th>
                                <th>จำนวนเงิน (฿)</th>
                                <th>ช่องทาง</th>
                                <th>สถานะ</th>
                                <th>วันที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topups.length === 0 ? (
                                <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลการเติมเงิน</td></tr>
                            ) : topups.map((t) => {
                                const s = TOPUP_STATUS[t.status] ?? { label: t.status, cls: "badge-gray" };
                                return (
                                    <tr key={t.id}>
                                        <td><span className="mono-id">#{t.id.slice(0, 8).toUpperCase()}</span></td>
                                        <td className="cell-email">{t.user?.email ?? '-'}</td>
                                        <td className="amount-orange">฿{parseFloat(t.amount).toLocaleString()}</td>
                                        <td className="cell-muted">{t.provider ?? '-'}</td>
                                        <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                                        <td className="cell-muted">
                                            {new Date(t.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
