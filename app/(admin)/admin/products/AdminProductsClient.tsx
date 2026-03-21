"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import Swal from "sweetalert2";
import { AdminTableControls, AdminPaginationFooter } from "../components/AdminSharedUI";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

export type Product = {
    id: string;
    name: string;
    category?: string;
    price: string | number;
    priceVip?: string | number;
    stock: number;
    isActive: boolean;
    imageUrl?: string;
};

export default function AdminProductsClient({
    initialProducts,
    token,
}: {
    initialProducts: Product[];
    token: string;
}) {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState<string>("");
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Filtering & Pagination State
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Derived states
    const filteredProducts = useMemo(() => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [products, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    // Handlers
    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1); // Reset to page 1 on new search
    };

    const handleLimitChange = (val: number) => {
        setItemsPerPage(val);
        setCurrentPage(1); // Reset to page 1 on limit change
    };

    const handleSavePrice = async (id: string) => {
        if (!editPrice || isNaN(Number(editPrice))) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ถูกต้อง',
                text: 'กรุณากรอกราคาเป็นตัวเลขที่ถูกต้อง',
                background: '#1e1e2d',
                color: '#fff',
            });
            return;
        }

        setLoadingId(id);
        try {
            const res = await fetch(`${API_URL}/admin/products/${id}/price`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ price: Number(editPrice) }),
            });

            if (res.ok) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, price: Number(editPrice) } : p))
                );
                setEditingId(null);

                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    text: 'อัปเดตราคาขายเรียบร้อยแล้ว',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1e1e2d',
                    color: '#fff',
                });
                router.refresh(); // Refresh RSC cache (background)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่สามารถอัปเดตราคาได้',
                    background: '#1e1e2d',
                    color: '#fff',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถติดต่อเซิร์ฟเวอร์',
                text: 'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
                background: '#1e1e2d',
                color: '#fff',
            });
        } finally {
            setLoadingId(null);
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const result = await Swal.fire({
            title: currentStatus ? "ปิดการขาย?" : "เปิดขายสินค้านี้?",
            text: currentStatus ? "ลูกค้าจะไม่สามารถซื้อสินค้านี้ได้ชั่วคราว" : "ลูกค้าจะเห็นและสามารถซื้อสินค้านี้ได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: currentStatus ? "#ef4444" : "#10b981",
            cancelButtonColor: "#3f3f46",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            background: '#1e1e2d',
            color: '#fff',
        });

        if (!result.isConfirmed) return;

        setLoadingId(id);
        try {
            const res = await fetch(`${API_URL}/admin/products/${id}/toggle-active`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, isActive: !currentStatus } : p))
                );
                Swal.fire({
                    icon: 'success',
                    title: 'เปลี่ยนแปลงสถานะสำเร็จ',
                    timer: 1200,
                    showConfirmButton: false,
                    background: '#1e1e2d',
                    color: '#fff',
                });
                router.refresh();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    background: '#1e1e2d',
                    color: '#fff',
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <>
            <div className="section-card">
                <div className="section-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-purple" />
                        รายการสินค้าทั้งหมด
                    </span>

                    {/* Filters & Controls */}
                    <AdminTableControls
                        searchQuery={searchQuery}
                        setSearchQuery={handleSearchChange}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={handleLimitChange}
                        placeholder="ค้นหาชื่อ, หมวดหมู่..."
                    />
                </div>

                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ชื่อสินค้า</th>
                                <th>หมวดหมู่</th>
                                <th>ราคาขาย (฿)</th>
                                <th>ราคาทุน VIP (฿)</th>
                                <th>คลัง</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.length === 0 ? (
                                <tr className="empty-row">
                                    <td colSpan={6}>ไม่พบข้อมูลสินค้าที่ค้นหา</td>
                                </tr>
                            ) : (
                                paginatedProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                {p.imageUrl ? (
                                                    <img src={p.imageUrl} alt="" className="product-img" />
                                                ) : (
                                                    <div className="product-img-placeholder">📦</div>
                                                )}
                                                <span className="cell-main cell-truncate" style={{ maxWidth: 150 }}>
                                                    {p.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="cell-muted">{p.category || "-"}</td>

                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span className="amount-orange">
                                                    ฿{parseFloat(String(p.price)).toLocaleString()}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(p.id);
                                                        setEditPrice(String(p.price));
                                                    }}
                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.8 }}
                                                    title="แก้ไขราคาขาย"
                                                >
                                                    <Pencil size={15} color="#a78bfa" />
                                                </button>
                                            </div>
                                        </td>

                                        <td style={{ color: "#a78bfa" }}>
                                            {p.priceVip ? `฿${parseFloat(String(p.priceVip)).toLocaleString()}` : "-"}
                                        </td>
                                        <td>
                                            <span className={p.stock > 0 ? "amount-pos" : "amount-neg"}>
                                                {p.stock > 0 ? p.stock.toLocaleString() : "หมด"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleToggleActive(p.id, p.isActive)}
                                                disabled={loadingId === p.id}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                                title="คลิกเพื่อเปลี่ยนสถานะ"
                                            >
                                                {p.isActive ? (
                                                    <span className="badge badge-green">เปิดขาย</span>
                                                ) : (
                                                    <span className="badge badge-gray">ปิดขาย</span>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <AdminPaginationFooter 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>

            {/* Edit Price Modal */}
            {editingId && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    backdropFilter: "blur(4px)"
                }}>
                    <div className="section-card" style={{ width: "400px", maxWidth: "90vw", padding: "24px", margin: 0 }}>
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "white", marginBottom: "8px" }}>
                                แก้ไขราคาขาย
                            </h3>
                            <p style={{ color: "#888", fontSize: "14px" }}>
                                สำหรับ: {products.find(p => p.id === editingId)?.name}
                            </p>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", fontSize: "14px", color: "#ccc", marginBottom: "8px" }}>
                                ราคา (บาท)
                            </label>
                            <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="admin-input"
                                style={{ width: "100%", padding: "10px" }}
                                min="0"
                                disabled={loadingId === editingId}
                                autoFocus
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                            <button
                                onClick={() => setEditingId(null)}
                                className="btn btn-secondary"
                                style={{ padding: "8px 16px" }}
                                disabled={loadingId === editingId}
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={() => handleSavePrice(editingId)}
                                className="btn btn-primary"
                                style={{ padding: "8px 16px" }}
                                disabled={loadingId === editingId}
                            >
                                {loadingId === editingId ? "กำลังบันทึก..." : "อัปเดตราคาใหม่"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
