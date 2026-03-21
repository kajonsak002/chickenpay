"use client";

import { useState, useMemo } from "react";
import { AdminTableControls, AdminPaginationFooter } from "../components/AdminSharedUI";

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
export type Order = {
    id: string;
    user?: { email?: string };
    items?: OrderItem[];
    totalAmount: string;
    status: string;
    createdAt: string;
};

export default function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filtered = useMemo(() => {
        return initialOrders.filter((o) => {
            const productNames = o.items?.map(i => i.product?.name).join(' ') || '';
            const query = searchQuery.toLowerCase();
            return o.id.toLowerCase().includes(query) ||
                   (o.user?.email || "").toLowerCase().includes(query) ||
                   productNames.toLowerCase().includes(query) ||
                   (STATUS_LABEL[o.status] || o.status).toLowerCase().includes(query);
        });
    }, [initialOrders, searchQuery]);

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
                    <span className="accent-dot accent-dot-green" />
                    รายการออเดอร์
                </span>
                <AdminTableControls
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={handleLimitChange}
                    placeholder="รหัสออเดอร์, อีเมล, สินค้า..."
                />
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
                        {paginated.length === 0 ? (
                            <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลออเดอร์</td></tr>
                        ) : paginated.map((o) => (
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
                                    {new Date(o.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok' })}
                                </td>
                            </tr>
                        ))}
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
