import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

import AdminTransactionsClient, { Transaction } from "./AdminTransactionsClient";

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

            {/* Interactive Table Client Component */}
            <AdminTransactionsClient initialTransactions={txs} />
        </div>
    );
}
