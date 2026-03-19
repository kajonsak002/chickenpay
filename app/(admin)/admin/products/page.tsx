import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
interface JwtPayload { sub: string; email: string; role: string; }

type Product = {
    id: string;
    name: string;
    category?: string;
    price: string;
    priceVip?: string;
    stock: number;
    isActive: boolean;
    imageUrl?: string;
};

export default async function AdminProductsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
    } catch { redirect("/admin-login"); }

    const res = await fetch(`${API_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
    });
    const products: Product[] = res.ok ? await res.json() : [];

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">จัดการสินค้า</h1>
                    <p className="page-subtitle">แอปพลิเคชันและบริการทั้งหมดในร้านค้า</p>
                </div>
                <span className="page-badge">{products.length} รายการ</span>
            </div>

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header">
                    <span className="section-card-title">
                        <span className="accent-dot accent-dot-purple" />
                        รายการสินค้า
                    </span>
                </div>
                <div className="table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ชื่อสินค้า</th>
                                <th>หมวดหมู่</th>
                                <th>ราคา (฿)</th>
                                <th>ราคา VIP (฿)</th>
                                <th>คลัง</th>
                                <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr className="empty-row"><td colSpan={6}>ไม่พบข้อมูลสินค้า</td></tr>
                            ) : products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {p.imageUrl
                                                ? <img src={p.imageUrl} alt="" className="product-img" />
                                                : <div className="product-img-placeholder">📦</div>
                                            }
                                            <span className="cell-main cell-truncate" style={{ maxWidth: 150 }}>{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="cell-muted">{p.category || '-'}</td>
                                    <td className="amount-orange">฿{parseFloat(p.price).toLocaleString()}</td>
                                    <td style={{ color: '#a78bfa' }}>
                                        {p.priceVip ? `฿${parseFloat(p.priceVip).toLocaleString()}` : '-'}
                                    </td>
                                    <td>
                                        <span className={p.stock > 0 ? 'amount-pos' : 'amount-neg'}>
                                            {p.stock > 0 ? p.stock.toLocaleString() : 'หมด'}
                                        </span>
                                    </td>
                                    <td>
                                        {p.isActive
                                            ? <span className="badge badge-green">เปิดขาย</span>
                                            : <span className="badge badge-gray">ปิดขาย</span>
                                        }
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
