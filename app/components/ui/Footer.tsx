"use client";

import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import { Facebook, Twitter, Youtube, MessageCircle, Gamepad2 } from "lucide-react";

export default function Footer() {
    const { isLoggedIn } = useAuth();
    return (
        <footer className="relative overflow-hidden bg-[var(--bg-secondary)] mt-16 border-t border-[var(--border-primary)] transition-colors">

            {/* === Tech Pattern Background === */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Circuit lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M10 10h80v80H10z" fill="none" stroke="#f97316" strokeWidth="0.5" />
                            <circle cx="10" cy="10" r="2" fill="#f97316" />
                            <circle cx="90" cy="10" r="2" fill="#f97316" />
                            <circle cx="10" cy="90" r="2" fill="#f97316" />
                            <circle cx="90" cy="90" r="2" fill="#f97316" />
                            <path d="M50 10v30M10 50h30M50 90V60M90 50H60" fill="none" stroke="#f97316" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="3" fill="none" stroke="#f97316" strokeWidth="0.5" />
                            <circle cx="50" cy="40" r="1.5" fill="#f97316" />
                            <circle cx="40" cy="50" r="1.5" fill="#f97316" />
                            <circle cx="50" cy="60" r="1.5" fill="#f97316" />
                            <circle cx="60" cy="50" r="1.5" fill="#f97316" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>

                {/* Glowing orbs */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-32 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-orange-500/3 rounded-full blur-[100px]" />
            </div>

            {/* === Top Divider — Orange gradient line === */}
            <div className="relative">
                <div className="h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
                <div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mt-px" />
            </div>

            {/* === Main Footer Content === */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600
                flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <span className="text-lg" aria-hidden="true">🐔</span>
                            </div>
                            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                                Chicken<span className="text-orange-400">Pay</span>
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
                            แพลตฟอร์มซื้อแอปพรีเมียม ราคาถูกที่สุด
                            ระบบอัตโนมัติรับทันที ปลอดภัย 100%
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-2.5">
                            <a href="#" className="w-9 h-9 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-blue-600 hover:border-blue-500/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"><Facebook size={18} /></a>
                            <a href="#" className="w-9 h-9 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-gray-700 hover:border-gray-600/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"><Twitter size={18} /></a>
                            <a href="#" className="w-9 h-9 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-red-600 hover:border-red-500/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"><Youtube size={18} /></a>
                            <a href="#" className="w-9 h-9 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-green-600 hover:border-green-500/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"><MessageCircle size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            เมนูหลัก
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "หน้าแรก", href: "/" },
                                { label: "แอปพรีเมียม", href: "/apps" },
                                { label: "เติมเงิน", href: "/topup" },
                                { label: "ประวัติการสั่งซื้อ", href: "/profile" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                        <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            ช่วยเหลือ
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "วิธีการสั่งซื้อ", href: "#" },
                                { label: "วิธีชำระเงิน", href: "#" },
                                { label: "ตรวจสอบออเดอร์", href: "/profile" },
                                { label: "ติดต่อเรา", href: "/contact" },
                                { label: "นโยบายความเป็นส่วนตัว", href: "/policy" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                        <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div>
                        <h4 className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            บัญชีของฉัน
                        </h4>
                        <ul className="space-y-3">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link href="/profile" className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                            <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                            โปรไฟล์ของฉัน
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/topup" className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                            <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                            เติมเงิน
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/login" className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                            <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                            เข้าสู่ระบบ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/register" className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300">
                                            <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                                            สมัครสมาชิก
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* === Bottom Bar === */}
                <div className="mt-10 pt-6 border-t border-[var(--border-primary)]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-600">
                            © 2026 ChickenPay. All rights reserved.
                        </p>

                        {/* Tech decoration */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-700">
                                <span className="w-1.5 h-1.5 bg-orange-500/40 rounded-full animate-pulse" />
                                SYSTEM ONLINE
                            </div>
                            <div className="h-3 w-px bg-white/10 hidden sm:block" />
                            <div className="flex items-center gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-orange-500/30 rounded-full animate-pulse"
                                        style={{
                                            height: `${6 + Math.random() * 8}px`,
                                            animationDelay: `${i * 0.15}s`,
                                            animationDuration: `${0.8 + Math.random() * 0.4}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}