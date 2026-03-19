import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

type User = { id: string; email: string; role: string; isActive: boolean; createdAt: string; };

function RoleBadge({ role }: { role: string }) {
    if (role === "SUPER_ADMIN") return <span className="badge badge-red">ซุปเปอร์แอดมิน</span>;
    if (role === "ADMIN") return <span className="badge badge-purple">แอดมิน</span>;
    return <span className="badge badge-gray">ผู้ใช้งาน</span>;
}

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

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header">
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-blue" />
                        รายการผู้ใช้งาน
                    </span>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>อีเมล</th>
                                <th>บทบาท</th>
                                <th>สถานะ</th>
                                <th>วันที่สมัคร</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr className="empty-row"><td colSpan={4}>ไม่พบข้อมูลผู้ใช้งาน</td></tr>
                            ) : users.map((u) => (
                                <tr key={u.id}>
                                    <td className="cell-email">{u.email}</td>
                                    <td><RoleBadge role={u.role} /></td>
                                    <td>
                                        {u.isActive
                                            ? <span className="badge badge-green">ใช้งานอยู่</span>
                                            : <span className="badge badge-red">ถูกระงับ</span>
                                        }
                                    </td>
                                    <td className="cell-muted">
                                        {new Date(u.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
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
