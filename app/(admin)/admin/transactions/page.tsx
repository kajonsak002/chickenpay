import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

const TX_TYPE: Record<string, { label: string; cls: string }> = {
    DEPOSIT: { label: "ฝากเงิน",      cls: "badge-green" },
    PAYMENT: { label: "ชำระเงิน",     cls: "badge-blue" },
    REFUND:  { label: "คืนเงิน",      cls: "badge-yellow" },
    REVENUE: { label: "รายได้",        cls: "badge-purple" },
    WITHDRAW:{ label: "ถอนเงิน",      cls: "badge-orange" },
};

type Transaction = {
    id: string;
    type: string;
    amount: string;
    balanceAfter?: string;
    note?: string;
    createdAt: string;
    user?: { email?: string };
};

export default async function AdminTransactionsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const res = await fetch(`${API_URL}/admin/transactions`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const txs: Transaction[] = res.ok ? await res.json() : [];

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">ธุรกรรมทางการเงิน</h1>
                    <p className="page-subtitle">บันทึกธุรกรรมกระเป๋าเงินทั้งหมดในระบบ</p>
                </div>
                <span className="page-badge">{txs.length} รายการ</span>
            </div>

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header">
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-purple" />
                        รายการธุรกรรม
                    </span>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>รหัส TX</th>
                                <th>ประเภท</th>
                                <th>จำนวน (฿)</th>
                                <th>ยอดคงเหลือหลัง</th>
                                <th>หมายเหตุ</th>
                                <th>วันที่</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txs.length === 0 ? (
                                <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลธุรกรรม</td></tr>
                            ) : txs.map((tx) => {
                                const t = TX_TYPE[tx.type] ?? { label: tx.type, cls: "badge-gray" };
                                const amt = parseFloat(tx.amount);
                                return (
                                    <tr key={tx.id}>
                                        <td><span className="mono-id">#{tx.id.slice(0, 8).toUpperCase()}</span></td>
                                        <td><span className={`badge ${t.cls}`}>{t.label}</span></td>
                                        <td className={amt >= 0 ? 'amount-pos' : 'amount-neg'}>
                                            {amt >= 0 ? '+' : ''}฿{amt.toLocaleString()}
                                        </td>
                                        <td className="cell-muted">
                                            ฿{parseFloat(tx.balanceAfter ?? '0').toLocaleString()}
                                        </td>
                                        <td className="cell-truncate cell-muted">{tx.note ?? '-'}</td>
                                        <td className="cell-muted">
                                            {new Date(tx.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
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
