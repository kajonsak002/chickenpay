"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { ShoppingCart, Wallet, PackageX, CreditCard, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import Pagination from "../components/ui/Pagination";

export default function HistoryTabs({ orders, topups }: { orders: any[], topups: any[] }) {
    const [activeTab, setActiveTab] = useState<"orders" | "topups">("orders");
    const [ordersPage, setOrdersPage] = useState(1);
    const [topupsPage, setTopupsPage] = useState(1);
    const LIMIT = 10;

    const ordersTotalPages = Math.ceil(orders.length / LIMIT);
    const currentOrders = orders.slice((ordersPage - 1) * LIMIT, ordersPage * LIMIT);

    const topupsTotalPages = Math.ceil(topups.length / LIMIT);
    const currentTopups = topups.slice((topupsPage - 1) * LIMIT, topupsPage * LIMIT);

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-lg h-full">
            {/* Tabs Header */}
            <div className="flex border-b border-[var(--border-primary)] mb-6" role="tablist" aria-label="ประวัติ">
                <button
                    onClick={() => setActiveTab("orders")}
                    role="tab"
                    aria-selected={activeTab === "orders"}
                    aria-controls="orders-panel"
                    aria-label="ดูประวัติการสั่งซื้อ"
                    id="orders-tab"
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === "orders" ? "text-blue-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                >
                    <ShoppingCart size={16} />
                    ประวัติการสั่งซื้อ
                    {activeTab === "orders" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>}
                </button>
                <button
                    onClick={() => setActiveTab("topups")}
                    role="tab"
                    aria-selected={activeTab === "topups"}
                    aria-controls="topups-panel"
                    aria-label="ดูประวัติการฝากเงิน"
                    id="topups-tab"
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === "topups" ? "text-orange-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                >
                    <Wallet size={16} />
                    ประวัติการฝากเงิน
                    {activeTab === "topups" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>}
                </button>
            </div>

            {/* Orders Content */}
            {activeTab === "orders" && (
                <div>
                    {orders.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <PackageX size={64} className="text-[var(--border-primary)] mb-4 mx-auto" strokeWidth={1} />
                            <p className="text-[var(--text-primary)] font-medium text-lg">ยังไม่มีประวัติการสั่งซื้อ</p>
                            <p className="text-[var(--text-secondary)] text-sm mt-1">คุณยังไม่ได้ทำการสั่งซื้อแอปพรีเมียมใดๆ</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {currentOrders.map((order) => (
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
                                                {order.status === 'DELIVERED' && <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold">จัดส่งแล้ว</span>}
                                                {order.status === 'PENDING' && <span className="px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold">รอดำเนินการ</span>}
                                                {order.status === 'CANCELLED' && <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold">ยกเลิก</span>}
                                                {order.status === 'PAID' && <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold">ชำระแล้ว</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {order.items?.map((item: any) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {item.product?.imageUrl ? (
                                                        <Image src={item.product.imageUrl || ""} alt={item.product.name || "สินค้า"} width={40} height={40} className="w-full h-full object-cover" />
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

                                        {/* Delivery Data Section */}
                                        {(order.status === 'COMPLETED' || order.status === 'DELIVERED') && order.deliveryData && Array.isArray(order.deliveryData) && (
                                            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-green-500/20 shadow-inner">
                                                <h4 className="text-sm font-bold text-green-500 mb-3 flex items-center gap-2">
                                                    <CheckCircle2 size={16} />
                                                    ข้อมูลบัญชีที่จัดส่ง
                                                </h4>
                                                <div className="space-y-3">
                                                    {order.deliveryData.map((dataItem: any, idx: number) => {
                                                        const rawText = dataItem.textdb || "";
                                                        // Attempt to detect user:pass or email|pass
                                                        const parts = rawText.split(/[|\n:]/).map((s: string) => s.trim()).filter(Boolean);

                                                        const handleCopy = (text: string, label: string) => {
                                                            navigator.clipboard.writeText(text);
                                                            Swal.fire({
                                                                toast: true,
                                                                position: 'top-end',
                                                                icon: 'success',
                                                                title: `คัดลอก ${label} แล้ว`,
                                                                showConfirmButton: false,
                                                                timer: 1500,
                                                                background: '#1e1e2d',
                                                                color: '#fff'
                                                            });
                                                        };

                                                        return (
                                                            <div key={idx} className="bg-[var(--bg-tertiary)] p-4 rounded-xl border border-[var(--border-primary)] group">
                                                                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[var(--border-primary)]/50">
                                                                    <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">ชุดที่ {idx + 1}</span>
                                                                    <button
                                                                        onClick={() => handleCopy(rawText, 'ข้อมูลทั้งหมด')}
                                                                        aria-label="คัดลอกข้อมูลทั้งหมด"
                                                                        className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                                                                    >
                                                                        <Copy size={12} />
                                                                        คัดลอกทั้งหมด
                                                                    </button>
                                                                </div>

                                                                {parts.length >= 2 ? (
                                                                    <div className="space-y-3">
                                                                        <div className="relative">
                                                                            <p className="text-[10px] text-gray-500 mb-1">Email / Username</p>
                                                                            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
                                                                                <span className="flex-1 font-mono text-sm text-blue-400 truncate">{parts[0]}</span>
                                                                                <button onClick={() => handleCopy(parts[0], 'อีเมล')} aria-label="คัดลอกอีเมล" className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><Copy size={14} className="text-gray-400" /></button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="relative">
                                                                            <p className="text-[10px] text-gray-500 mb-1">Password</p>
                                                                            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
                                                                                <span className="flex-1 font-mono text-sm text-orange-400 truncate">{parts[1]}</span>
                                                                                <button onClick={() => handleCopy(parts[1], 'รหัสผ่าน')} aria-label="คัดลอกรหัสผ่าน" className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><Copy size={14} className="text-gray-400" /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap font-mono p-2 bg-black/20 rounded-lg">
                                                                        {rawText}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {orders.length > 0 && ordersTotalPages > 1 && (
                                <Pagination
                                    currentPage={ordersPage}
                                    totalPages={ordersTotalPages}
                                    onPageChange={(page) => setOrdersPage(page)}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Topups Content */}
            {activeTab === "topups" && (
                <div>
                    {topups.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <CreditCard size={64} className="text-[var(--border-primary)] mb-4 mx-auto" strokeWidth={1} />
                            <p className="text-[var(--text-primary)] font-medium text-lg">ยังไม่มีประวัติการฝากเงิน</p>
                            <p className="text-[var(--text-secondary)] text-sm mt-1">คุณยังไม่ได้ทำรายการฝากเงินเข้าสู่ระบบ</p>
                            <Link href="/topup" className="mt-4 text-orange-400 hover:text-orange-300 text-sm font-bold flex items-center gap-1.5 transition-colors">
                                เติมเงินทันที <ArrowRight size={16} />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {currentTopups.map((topup) => (
                                <div key={topup.id} className="p-4 rounded-xl border border-[var(--border-primary)] hover:border-orange-500/30 transition-colors bg-[var(--bg-primary)]">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center text-xl shadow-inner">
                                                {topup.status === 'CREDITED' ? '💸' : topup.status === 'REJECTED' ? '❌' : '⏳'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[var(--text-primary)]">เติมเงินผ่านพร้อมเพย์</p>
                                                <p className="text-[10px] text-[var(--text-secondary)]">
                                                    {new Date(topup.createdAt).toLocaleString('th-TH')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full mt-2 sm:mt-0">
                                            <div>
                                                {topup.status === 'CREDITED' && <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold">สำเร็จ</span>}
                                                {topup.status === 'PENDING' && <span className="px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold">กำลังตรวจสอบ</span>}
                                                {topup.status === 'REJECTED' && <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold" title={topup.rejectReason}>ไม่สำเร็จ</span>}
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-lg font-bold leading-none ${topup.status === 'CREDITED' ? 'text-green-500' : 'text-gray-400'}`}>
                                                    +{parseFloat(topup.amount || 0).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {topup.status === 'REJECTED' && topup.rejectReason && (
                                        <div className="mt-3 pt-3 border-t border-[var(--border-primary)]">
                                            <p className="text-xs text-red-400">หมายเหตุ: {topup.rejectReason}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {topups.length > 0 && topupsTotalPages > 1 && (
                                <Pagination
                                    currentPage={topupsPage}
                                    totalPages={topupsTotalPages}
                                    onPageChange={(page) => setTopupsPage(page)}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
