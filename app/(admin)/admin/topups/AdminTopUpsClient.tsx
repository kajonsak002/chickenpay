"use client";

import { useState, useMemo } from "react";
import { AdminTableControls, AdminPaginationFooter } from "../components/AdminSharedUI";

const TOPUP_STATUS: Record<string, { label: string; cls: string }> = {
    CREDITED: { label: "เติมเงินสำเร็จ", cls: "badge-green" },
    PENDING:  { label: "รอดำเนินการ",   cls: "badge-yellow" },
    FAILED:   { label: "ล้มเหลว",        cls: "badge-red" },
    REJECTED: { label: "ถูกปฏิเสธ",     cls: "badge-red" },
};

export type TopUp = {
    id: string;
    user?: { email?: string };
    amount: string;
    provider?: string;
    status: string;
    createdAt: string;
};

export default function AdminTopUpsClient({ initialTopUps }: { initialTopUps: TopUp[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filtered = useMemo(() => {
        return initialTopUps.filter((t) => {
            const query = searchQuery.toLowerCase();
            return t.id.toLowerCase().includes(query) ||
                   (t.user?.email || "").toLowerCase().includes(query) ||
                   (t.provider || "").toLowerCase().includes(query) ||
                   ((TOPUP_STATUS[t.status]?.label) || t.status).toLowerCase().includes(query);
        });
    }, [initialTopUps, searchQuery]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, currentPage, itemsPerPage]);

    const handleSearchChange = (val: string) => { setSearchQuery(val); setCurrentPage(1); };
    const handleLimitChange = (val: number) => { setItemsPerPage(val); setCurrentPage(1); };

    return (
        <div className="section-card">
            <div className="section-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <span className="section-card-title">
                    <span className="accent-dot accent-dot-orange" />
                    รายการเติมเงิน
                </span>
                <AdminTableControls
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={handleLimitChange}
                    placeholder="ค้นหารหัส, อีเมล..."
                />
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
                        {paginated.length === 0 ? (
                            <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลการเติมเงิน</td></tr>
                        ) : paginated.map((t) => {
                            const s = TOPUP_STATUS[t.status] ?? { label: t.status, cls: "badge-gray" };
                            return (
                                <tr key={t.id}>
                                    <td><span className="mono-id">#{t.id.slice(0, 8).toUpperCase()}</span></td>
                                    <td className="cell-email">{t.user?.email ?? '-'}</td>
                                    <td className="amount-orange">฿{parseFloat(t.amount).toLocaleString()}</td>
                                    <td className="cell-muted">{t.provider ?? '-'}</td>
                                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                                    <td className="cell-muted">
                                        {new Date(t.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok' })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <AdminPaginationFooter 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalItems={filtered.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}
