import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { logoutAction } from "../actions/auth";
import HistoryTabs from "./HistoryTabs";

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
    status: string; // PENDING, PAID, COMPLETED, DELIVERED, CANCELLED
    createdAt: string;
    items: OrderItem[];
    deliveryData?: any;
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

    const [profileRes, walletRes, ordersRes, topupsRes] = await Promise.all([
        fetch(`${API_URL}/auth/profile`, { headers, cache: 'no-store' }),
        fetch(`${API_URL}/wallets/me`, { headers, cache: 'no-store' }),
        fetch(`${API_URL}/orders`, { headers, cache: 'no-store' }),
        fetch(`${API_URL}/topup/history`, { headers, cache: 'no-store' })
    ]);

    if (!profileRes.ok) {
        // Token invalid or expired
        redirect("/login");
    }

    const profile: UserProfile = await profileRes.json();
    const wallet: Wallet = await walletRes.json();
    const orders: Order[] = await ordersRes.json();
    const topups = await topupsRes.json().catch(() => []);

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

                    {/* Right Content - History Tabs */}
                    <div className="w-full md:w-2/3">
                        <HistoryTabs orders={orders} topups={topups} />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
