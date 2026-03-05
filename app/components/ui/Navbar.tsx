"use client";

import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-orange-500/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600
              flex items-center justify-center shadow-lg shadow-orange-500/25
              group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
                            <img src="./logo.png" alt="" className="w-full h-full object-contain" />
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-xl border border-orange-400/30 group-hover:border-orange-400/60 transition-colors" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-white text-xl font-bold tracking-tight">
                                Chicken<span className="text-orange-400">Pay</span>
                            </span>
                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-300 rounded-full" />
                        </div>
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {[
                            { label: "หน้าแรก", href: "/", active: true },
                            { label: "เติมเกม", href: "/games" },
                            { label: "แอปพรีเมียม", href: "/apps" },
                            { label: "ติดต่อเรา", href: "#contact" },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${link.active
                                        ? "text-orange-400 bg-orange-500/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }
                `}
                            >
                                {link.label}
                                {link.active && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="px-5 py-2 text-sm font-semibold text-gray-300 rounded-xl
              border border-white/10 hover:border-orange-500/40 hover:text-white
              hover:bg-white/5 transition-all duration-300 cursor-pointer">
                            เข้าสู่ระบบ
                        </button>
                        <button className="px-5 py-2 text-sm font-semibold text-white rounded-xl
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-600 hover:to-orange-700
              shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40
              hover:scale-105 active:scale-95
              transition-all duration-300 cursor-pointer">
                            สมัครสมาชิก
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 
              flex items-center justify-center text-gray-300 hover:text-orange-400
              hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex flex-col gap-1.5 w-5">
                            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center
                ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300
                ${menuOpen ? "opacity-0 scale-0" : ""}`} />
                            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center
                ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
        ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 py-4 border-t border-white/5 bg-black/90 backdrop-blur-xl space-y-1">
                    {[
                        { label: "หน้าแรก", href: "/" },
                        { label: "เติมเกม", href: "/games" },
                        { label: "แอปพรีเมียม", href: "/apps" },
                        { label: "ติดต่อเรา", href: "#contact" },
                    ].map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${i === 0
                                    ? "text-orange-400 bg-orange-500/10"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex gap-3 pt-3 mt-2 border-t border-white/5">
                        <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-300 rounded-xl
              border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer">
                            เข้าสู่ระบบ
                        </button>
                        <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl
              bg-gradient-to-r from-orange-500 to-orange-600
              shadow-lg shadow-orange-500/20 transition-all cursor-pointer">
                            สมัครสมาชิก
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}