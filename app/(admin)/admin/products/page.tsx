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

import AdminProductsClient from "./AdminProductsClient";

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
                    <p className="page-subtitle">แอปพลิเคชันและบริการทั้งหมดในร้านค้า (ราคาขายตั้งเองได้ ราคาทุนจะได้จาก Auto-Sync)</p>
                </div>
                <span className="page-badge">{products.length} รายการ</span>
            </div>

            {/* Client Component for Interactive Table */}
            <AdminProductsClient initialProducts={products} token={token} />
        </div>
    );
}
