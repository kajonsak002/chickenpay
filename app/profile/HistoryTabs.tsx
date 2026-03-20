"use client";

import { useState } from "react";

export default function HistoryTabs({ orders, topups }: { orders: any[], topups: any[] }) {
    const [activeTab, setActiveTab] = useState<"orders" | "topups">("orders");

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-lg h-full">
            {/* Tabs Header */}
            <div className="flex border-b border-[var(--border-primary)] mb-6">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${
                        activeTab === "orders" ? "text-blue-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    ประวัติการสั่งซื้อ
                    {activeTab === "orders" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>}
                </button>
                <button
                    onClick={() => setActiveTab("topups")}
                    className={`pb-3 px-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${
                        activeTab === "topups" ? "text-orange-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ประวัติการฝากเงิน
                    {activeTab === "topups" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>}
                </button>
            </div>

            {/* Orders Content */}
            {activeTab === "orders" && (
                <div>
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

                                        {/* Delivery Data Section */}
                                        {(order.status === 'COMPLETED' || order.status === 'DELIVERED') && order.deliveryData && Array.isArray(order.deliveryData) && (
                                            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-green-500/20 shadow-inner">
                                                <h4 className="text-sm font-bold text-green-500 mb-3 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    ข้อมูลบัญชีที่จัดส่ง
                                                </h4>
                                                <div className="space-y-3">
                                                    {order.deliveryData.map((dataItem: any, idx: number) => (
                                                        <div key={idx} className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-primary)]">
                                                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-[var(--border-primary)]/50">
                                                                <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">บัญชีที่ {idx + 1}</span>
                                                                <span className="text-[10px] text-blue-400">UID: {dataItem.uid || '-'}</span>
                                                            </div>
                                                            <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap font-mono select-all">
                                                                {dataItem.textdb || JSON.stringify(dataItem)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Topups Content */}
            {activeTab === "topups" && (
                <div>
                    {topups.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <svg className="w-16 h-16 text-[var(--border-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-[var(--text-primary)] font-medium text-lg">ยังไม่มีประวัติการฝากเงิน</p>
                            <p className="text-[var(--text-secondary)] text-sm mt-1">คุณยังไม่ได้ทำรายการฝากเงินเข้าสู่ระบบ</p>
                            <a href="/topup" className="mt-4 text-orange-400 hover:text-orange-300 text-sm font-bold flex items-center gap-1.5 transition-colors">
                                เติมเงินทันที <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {topups.map((topup) => (
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
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
