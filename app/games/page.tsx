"use client";

import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { GAMES } from "../lib/games";

export default function GamesPage() {
    const [search, setSearch] = useState("");
    const [filterDiscount, setFilterDiscount] = useState(false);

    const filtered = GAMES.filter((g) => {
        const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
        const matchDiscount = !filterDiscount || parseFloat(g.discount) > 0;
        return matchSearch && matchDiscount;
    });

    return (
        <main className="bg-[#0f0f1a] min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">🎮 เติมเกมออนไลน์</h1>
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                            {GAMES.length} เกม
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">เติมเกมออนไลน์ ราคาถูก ระบบอัตโนมัติ รับทันที 24 ชม.</p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ค้นหาเกม..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setFilterDiscount(!filterDiscount)}
                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer
              ${filterDiscount
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                : "bg-[#1a1a2e] border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/30"
                            }`}
                    >
                        🏷️ มีส่วนลด
                    </button>
                </div>

                {/* Results count */}
                <p className="text-xs text-gray-600 mb-4">แสดง {filtered.length} จาก {GAMES.length} เกม</p>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filtered.map((game) => {
                        const discount = parseFloat(game.discount);
                        return (
                            <a
                                key={game.category}
                                href={`/game/${game.category}`}
                                className="group"
                            >
                                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-2.5 bg-[#1a1a2e]">
                                    <img
                                        src={game.img}
                                        alt={game.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                `https://placehold.co/300x400/1a1a2e/f97316?text=${encodeURIComponent(game.name)}&font=roboto`;
                                        }}
                                    />

                                    {/* Discount */}
                                    {discount > 0 && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl"
                                                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)", paddingBottom: "6px" }}>
                                                ลด {game.discount}%
                                            </div>
                                        </div>
                                    )}

                                    {/* Package count */}
                                    <div className="absolute bottom-2 left-2">
                                        <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-gray-300 text-[9px] font-medium">
                                            {game.packagesCount} แพ็กเกจ
                                        </span>
                                    </div>

                                    {/* Hover */}
                                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
                                    <div className="absolute inset-0 border border-transparent group-hover:border-orange-500/30 rounded-2xl transition-all duration-300" />
                                </div>

                                <p className="text-white text-xs sm:text-sm font-medium text-center truncate group-hover:text-orange-400 transition-colors px-1">
                                    {game.name}
                                </p>
                            </a>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="text-gray-500">ไม่พบเกมที่ค้นหา</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
