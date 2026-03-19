import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { logoutAction } from "../actions/auth";

interface UserProfile {
    id: string;
    email: string;
    role: string;
}

interface Wallet {
    id: string;
    balance: number;
    status: string;
}

interface OrderItem {
    id: string;
    price: string;
    quantity: number;
    product: {
        name: string;
        imageUrl?: string;
    }
}

interface Order {
    id: string;
    totalAmount: string;
    status: string; // PENDING, PAID, COMPLETED, CANCELLED
    createdAt: string;
    items: OrderItem[];
}

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const [profileRes, walletRes, ordersRes] = await Promise.all([
        fetch(`${API_URL}/auth/profile`, { headers, cache: 'no-store' }),
        fetch(`${API_URL}/wallets/me`, { headers, cache: 'no-store' }),
        fetch(`${API_URL}/orders`, { headers, cache: 'no-store' })
    ]);

    if (!profileRes.ok) {
        // Token invalid or expired
        redirect("/login");
    }

    const profile: UserProfile = await profileRes.json();
    const wallet: Wallet = await walletRes.json();
    const orders: Order[] = await ordersRes.json();

    return (
        <main className="bg-[var(--bg-primary)] min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Profile & Wallet */}
                    <div className="w-full md:w-1/3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold font-sans shadow-lg shadow-orange-500/30">
                                    {profile?.email?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-[var(--text-primary)] font-bold text-lg truncate max-w-[200px]">{profile?.email}</h2>
                                    <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                                        {profile?.role}
                                    </span>
                                </div>
                            </div>

                            <form action={logoutAction}>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    ออกจากระบบ
                                </button>
                            </form>
                        </div>

                        {/* Wallet Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-[#151522] border border-[var(--border-primary)] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl"></div>

                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-gray-400 text-sm font-medium">ยอดเงินคงเหลือ (฿)</h3>
                                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>

                            <div className="text-4xl font-bold text-white tracking-tight mb-6">
                                ฿{wallet ? parseFloat(wallet.balance.toString()).toFixed(2) : "0.00"}
                            </div>

                            <div className="flex gap-3">
                                <a href="/topup" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center text-sm font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
                                    เติมเงิน
                                </a>
                                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-2.5 rounded-xl border border-white/10 transition-colors">
                                    ประวัติ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Order History */}
                    <div className="w-full md:w-2/3">
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-lg h-full">
                            <h3 className="text-[var(--text-primary)] text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                                ประวัติการสั่งซื้อ
                            </h3>

                            {orders.length === 0 ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                    <svg className="w-16 h-16 text-[var(--border-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <p className="text-[var(--text-primary)] font-medium text-lg">ยังไม่มีประวัติการสั่งซื้อ</p>
                                    <p className="text-[var(--text-secondary)] text-sm mt-1">คุณยังไม่ได้ทำการสั่งซื้อแอปพรีเมียมใดๆ</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="p-4 rounded-xl border border-[var(--border-primary)] hover:border-blue-500/30 transition-colors bg-[var(--bg-primary)]">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4 pb-4 border-b border-[var(--border-primary)]">
                                                <div>
                                                    <p className="text-xs text-[var(--text-secondary)] mb-1">
                                                        รหัสออเดอร์: <span className="font-mono text-[var(--text-primary)]">{order.id.slice(0, 8).toUpperCase()}</span>
                                                    </p>
                                                    <p className="text-[10px] text-[var(--text-secondary)]">
                                                        {new Date(order.createdAt).toLocaleString('th-TH')}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-[var(--text-secondary)] mb-0.5">ยอดรวม</p>
                                                        <p className="text-blue-500 font-bold leading-none">฿{parseFloat(order.totalAmount).toFixed(0)}</p>
                                                    </div>
                                                    <div>
                                                        {order.status === 'COMPLETED' && <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold">สำเร็จ</span>}
                                                        {order.status === 'PENDING' && <span className="px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold">รอดำเนินการ</span>}
                                                        {order.status === 'CANCELLED' && <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold">ยกเลิก</span>}
                                                        {order.status === 'PAID' && <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold">ชำระแล้ว</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {order.items?.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                            {item.product?.imageUrl ? (
                                                                <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-lg">📦</span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.product?.name || "ไม่ทราบชื่อสินค้า"}</p>
                                                            <p className="text-[11px] text-[var(--text-secondary)]">จำนวน: {item.quantity} x ฿{parseFloat(item.price).toFixed(0)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
