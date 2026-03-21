"use client";

import { useState, useMemo } from "react";
import { AdminTableControls, AdminPaginationFooter } from "../components/AdminSharedUI";

const TX_TYPE: Record<string, { label: string; cls: string }> = {
    DEPOSIT: { label: "ฝากเงิน",      cls: "badge-green" },
    PAYMENT: { label: "ชำระเงิน",     cls: "badge-blue" },
    REFUND:  { label: "คืนเงิน",      cls: "badge-yellow" },
    REVENUE: { label: "รายได้",        cls: "badge-purple" },
    WITHDRAW:{ label: "ถอนเงิน",      cls: "badge-orange" },
};

export type Transaction = {
    id: string;
    type: string;
    amount: string;
    balanceAfter?: string;
    note?: string;
    createdAt: string;
    user?: { email?: string };
};

export default function AdminTransactionsClient({ initialTransactions }: { initialTransactions: Transaction[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filtered = useMemo(() => {
        return initialTransactions.filter((tx) => {
            const query = searchQuery.toLowerCase();
            return tx.id.toLowerCase().includes(query) ||
                   (tx.user?.email || "").toLowerCase().includes(query) ||
                   (tx.note || "").toLowerCase().includes(query) ||
                   ((TX_TYPE[tx.type]?.label) || tx.type).toLowerCase().includes(query);
        });
    }, [initialTransactions, searchQuery]);

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
                    <span className="accent-dot accent-dot-purple" />
                    รายการธุรกรรม
                </span>
                <AdminTableControls
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={handleLimitChange}
                    placeholder="รหัส TX, อีเมล, หมายเหตุ..."
                />
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
                        {paginated.length === 0 ? (
                            <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลธุรกรรม</td></tr>
                        ) : paginated.map((tx) => {
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
                                        {new Date(tx.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok' })}
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
