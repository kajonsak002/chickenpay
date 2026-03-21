"use client";

import { useState, useMemo } from "react";
import { AdminTableControls, AdminPaginationFooter } from "../components/AdminSharedUI";

export type User = { id: string; email: string; role: string; isActive: boolean; createdAt: string; };

function RoleBadge({ role }: { role: string }) {
    if (role === "SUPER_ADMIN") return <span className="badge badge-red">ซุปเปอร์แอดมิน</span>;
    if (role === "ADMIN") return <span className="badge badge-purple">แอดมิน</span>;
    return <span className="badge badge-gray">ผู้ใช้งาน</span>;
}

export default function AdminUsersClient({ initialUsers }: { initialUsers: User[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filtered = useMemo(() => {
        return initialUsers.filter((u) =>
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialUsers, searchQuery]);

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
                    <span className="accent-dot accent-dot-blue" />
                    รายการผู้ใช้งาน
                </span>
                <AdminTableControls
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={handleLimitChange}
                    placeholder="ค้นหาอีเมล, หน้าที่..."
                />
            </div>
            <div className="table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ไอดีผู้ใช้</th>
                            <th>อีเมล</th>
                            <th>บทบาท</th>
                            <th>สถานะ</th>
                            <th>วันที่สมัคร</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr className="empty-row"><td colSpan={5}>ไม่มีข้อมูลผู้ใช้สอดคล้องกับการค้นหา</td></tr>
                        ) : paginated.map((u) => (
                            <tr key={u.id}>
                                <td><span className="mono-id">#{u.id.slice(0, 8).toUpperCase()}</span></td>
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
