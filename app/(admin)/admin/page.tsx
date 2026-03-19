import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

interface JwtPayload { sub: string; email: string; role: string; }

async function adminFetch(path: string, token: string) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

function StatCard({ label, value, icon, color, trend }: {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: string;
}) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-body">
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
                {trend && <p className="stat-trend">{trend}</p>}
            </div>
        </div>
    );
}

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const data = await adminFetch('/admin/dashboard', token);
    const s = data?.summary ?? {};

    return (
        <>
            {/* Page header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">ภาพรวมระบบ ChickenPay ทั้งหมด</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    label="ผู้ใช้งานทั้งหมด"
                    value={(s.totalUsers ?? 0).toLocaleString()}
                    color="stat-blue"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="ออเดอร์ทั้งหมด"
                    value={(s.totalOrders ?? 0).toLocaleString()}
                    color="stat-green"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                />
                <StatCard
                    label="สินค้าทั้งหมด"
                    value={(s.totalProducts ?? 0).toLocaleString()}
                    color="stat-purple"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    }
                />
                <StatCard
                    label="ยอดเติมเงินทั้งหมด"
                    value={(s.totalTopUps ?? 0).toLocaleString()}
                    color="stat-orange"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    }
                />
                <StatCard
                    label="รายได้รวม (฿)"
                    value={`฿${(s.totalRevenue ?? 0).toLocaleString()}`}
                    color="stat-yellow"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="เงินฝากรวม (฿)"
                    value={`฿${(s.totalDeposits ?? 0).toLocaleString()}`}
                    color="stat-cyan"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="ยอดกระเป๋าเงินรวม (฿)"
                    value={`฿${(s.totalWalletBalance ?? 0).toLocaleString()}`}
                    color="stat-pink"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Recent Orders Table */}
            <div className="section-card">
                <div className="section-header">
                    <div className="section-title-group">
                        <span className="section-accent-bar green" />
                        <h2 className="section-title">ออเดอร์ล่าสุด</h2>
                    </div>
                    <a href="/admin/orders" className="section-view-all">
                        ดูทั้งหมด
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>ผู้ใช้</th>
                                <th>ยอดรวม</th>
                                <th>สถานะ</th>
                                <th>วันที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data?.recentOrders ?? []).length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                                        ไม่มีข้อมูลออเดอร์
                                    </td>
                                </tr>
                            ) : (
                                (data?.recentOrders ?? []).map((o: {id: string; user?: {email?: string}; totalAmount: string; status: string; createdAt: string}) => (
                                    <tr key={o.id}>
                                        <td>
                                            <span className="mono-id">#{o.id.slice(0, 8).toUpperCase()}</span>
                                        </td>
                                        <td className="email-cell">{o.user?.email ?? '-'}</td>
                                        <td className="amount-cell">฿{parseFloat(o.totalAmount).toLocaleString()}</td>
                                        <td><StatusBadge status={o.status} /></td>
                                        <td className="date-cell">{new Date(o.createdAt).toLocaleString('th-TH')}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                .page-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 28px;
                }
                .page-title {
                    font-size: 26px;
                    font-weight: 800;
                    color: #e2e8f0;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }
                .page-subtitle {
                    font-size: 13px;
                    color: #64748b;
                    margin-top: 4px;
                }

                /* Stats */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 28px;
                }
                .stat-card {
                    background: var(--admin-surface);
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    border: 1px solid var(--admin-border);
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                    position: relative;
                    overflow: hidden;
                }
                .stat-card::after {
                    content: "";
                    position: absolute;
                    top: 0; right: 0;
                    width: 80px; height: 80px;
                    border-radius: 50%;
                    opacity: 0.06;
                    transform: translate(20px, -20px);
                    background: currentColor;
                }
                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                }
                .stat-icon {
                    width: 42px; height: 42px;
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .stat-body { flex: 1; min-width: 0; }
                .stat-label {
                    font-size: 11.5px;
                    color: #64748b;
                    font-weight: 500;
                    margin-bottom: 6px;
                    line-height: 1.4;
                }
                .stat-value {
                    font-size: 22px;
                    font-weight: 800;
                    color: #e2e8f0;
                    letter-spacing: -0.02em;
                    line-height: 1;
                }
                .stat-blue .stat-icon { background: rgba(59,130,246,0.15); color: #60a5fa; }
                .stat-blue { border-color: rgba(59,130,246,0.14); }
                .stat-green .stat-icon { background: rgba(34,197,94,0.12); color: #4ade80; }
                .stat-green { border-color: rgba(34,197,94,0.14); }
                .stat-purple .stat-icon { background: rgba(124,58,237,0.15); color: #a78bfa; }
                .stat-purple { border-color: rgba(124,58,237,0.16); }
                .stat-orange .stat-icon { background: rgba(249,115,22,0.13); color: #fb923c; }
                .stat-orange { border-color: rgba(249,115,22,0.14); }
                .stat-yellow .stat-icon { background: rgba(234,179,8,0.12); color: #facc15; }
                .stat-yellow { border-color: rgba(234,179,8,0.14); }
                .stat-cyan .stat-icon { background: rgba(6,182,212,0.12); color: #22d3ee; }
                .stat-cyan { border-color: rgba(6,182,212,0.14); }
                .stat-pink .stat-icon { background: rgba(236,72,153,0.12); color: #f472b6; }
                .stat-pink { border-color: rgba(236,72,153,0.14); }

                /* Section Card */
                .section-card {
                    background: var(--admin-surface);
                    border: 1px solid var(--admin-border);
                    border-radius: 18px;
                    padding: 24px;
                    margin-bottom: 20px;
                }
                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .section-title-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .section-accent-bar {
                    width: 4px; height: 20px;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                .section-accent-bar.green { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
                .section-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #e2e8f0;
                }
                .section-view-all {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #a78bfa;
                    text-decoration: none;
                    transition: color 0.15s;
                }
                .section-view-all:hover { color: #c4b5fd; }

                /* Table */
                .table-wrap { overflow-x: auto; }
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                }
                .admin-table thead tr {
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .admin-table th {
                    text-align: left;
                    padding: 10px 12px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #64748b;
                }
                .admin-table tbody tr {
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                    transition: background 0.15s;
                }
                .admin-table tbody tr:last-child { border-bottom: none; }
                .admin-table tbody tr:hover { background: rgba(255,255,255,0.02); }
                .admin-table td { padding: 12px 12px; }
                .mono-id {
                    font-family: ui-monospace, monospace;
                    font-size: 12px;
                    color: #a78bfa;
                    background: rgba(124,58,237,0.1);
                    padding: 3px 8px;
                    border-radius: 6px;
                    border: 1px solid rgba(124,58,237,0.15);
                }
                .email-cell {
                    color: #cbd5e1;
                    max-width: 160px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .amount-cell {
                    color: #4ade80;
                    font-weight: 700;
                }
                .date-cell {
                    color: #64748b;
                    font-size: 12px;
                    white-space: nowrap;
                }

                /* Status badges */
                .status-badge {
                    padding: 3px 9px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    border: 1px solid;
                    white-space: nowrap;
                }
                .status-COMPLETED { background: rgba(34,197,94,0.1); color: #4ade80; border-color: rgba(34,197,94,0.2); }
                .status-PENDING { background: rgba(234,179,8,0.1); color: #facc15; border-color: rgba(234,179,8,0.2); }
                .status-CANCELLED { background: rgba(239,68,68,0.1); color: #f87171; border-color: rgba(239,68,68,0.2); }
                .status-PAID { background: rgba(59,130,246,0.1); color: #60a5fa; border-color: rgba(59,130,246,0.2); }
                .status-DELIVERED { background: rgba(124,58,237,0.1); color: #a78bfa; border-color: rgba(124,58,237,0.2); }
                .status-default { background: rgba(100,116,139,0.1); color: #94a3b8; border-color: rgba(100,116,139,0.2); }
            `}</style>
        </>
    );
}

function StatusBadge({ status }: { status: string }) {
    const labels: Record<string, string> = {
        COMPLETED: "สำเร็จ",
        PENDING: "รอดำเนินการ",
        CANCELLED: "ยกเลิก",
        PAID: "ชำระแล้ว",
        DELIVERED: "จัดส่งแล้ว",
    };
    const cls = `status-${status}` in {
        "status-COMPLETED": 1, "status-PENDING": 1, "status-CANCELLED": 1,
        "status-PAID": 1, "status-DELIVERED": 1
    } ? `status-badge status-${status}` : "status-badge status-default";

    return <span className={cls}>{labels[status] ?? status}</span>;
}
