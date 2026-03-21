"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import { ShieldAlert, User, LogIn, UserPlus, Menu, X } from "lucide-react";

const navLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "แอปพรีเมียม", href: "/apps" },
    { label: "ติดต่อเรา", href: "/contact" },
];

export default function NavbarClient({
    isLoggedIn: propIsLoggedIn,
    isAdmin: propIsAdmin
}: {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
}) {
    const auth = useAuth();
    const pathname = usePathname();

    // Use props if provided (from Server Component), otherwise fallback to Context
    const isLoggedIn = propIsLoggedIn ?? auth.isLoggedIn;
    const isAdmin = propIsAdmin ?? auth.isAdmin;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-orange-500/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group" aria-label="ChickenPay - หน้าแรก">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600
              flex items-center justify-center shadow-lg shadow-orange-500/25
              group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
                            <Image src="/logo.png" alt="โลโก้ ChickenPay" width={40} height={40} className="w-full h-full object-contain" priority />
                            <div className="absolute inset-0 rounded-xl border border-orange-400/30 group-hover:border-orange-400/60 transition-colors" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-white text-xl font-bold tracking-tight">
                                Chicken<span className="text-orange-400">Pay</span>
                            </span>
                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-300 rounded-full" />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2
                                        ${isActive
                                            ? "text-white bg-white/5"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                    )}
                                </Link>
                            );
                        })}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2
                                    ${pathname.startsWith("/admin")
                                        ? "text-white bg-purple-500/10"
                                        : "text-purple-400 hover:text-white hover:bg-purple-500/10"
                                    }`}
                            >
                                <ShieldAlert size={16} /> แอดมิน
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <Link href="/profile" className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                                <User size={16} />
                                โปรไฟล์
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-300 rounded-xl border border-white/10 hover:border-orange-500/40 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                                    <LogIn size={16} />เข้าสู่ระบบ
                                </Link>
                                <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                                    <UserPlus size={16} />สมัครสมาชิก
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Touch Target >= 44x44 */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 py-4 border-t border-white/5 bg-black/90 backdrop-blur-xl space-y-1">
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5">
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-purple-400 hover:bg-purple-500/10">
                            <ShieldAlert size={16} /> แอดมิน
                        </Link>
                    )}
                    <div className="flex flex-col gap-3 pt-3 mt-2 border-t border-white/5">
                        {isLoggedIn ? (
                            <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3 min-h-[44px] text-sm font-bold text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 transition-all">
                                <User size={16} /> โปรไฟล์ของฉัน
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3 min-h-[44px] text-sm font-bold text-gray-300 rounded-xl border border-white/10 hover:border-orange-500/40 transition-all">
                                    <LogIn size={16} /> เข้าสู่ระบบ
                                </Link>
                                <Link href="/register" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3 min-h-[44px] text-sm font-bold text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 transition-all">
                                    <UserPlus size={16} /> สมัครสมาชิก
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}