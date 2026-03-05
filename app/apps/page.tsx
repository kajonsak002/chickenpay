"use client";

import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { getProductsByCategory } from "../lib/products";

const categories = getProductsByCategory();

export default function AppsPage() {
    const [search, setSearch] = useState("");
    const [filterStock, setFilterStock] = useState(false);

    const filtered = categories.filter((cat) => {
        const matchSearch = cat.name.toLowerCase().includes(search.toLowerCase());
        const matchStock = !filterStock || cat.products.some((p) => parseInt(p.stock) > 0);
        return matchSearch && matchStock;
    });

    return (
        <main className="bg-[#0f0f1a] min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">📱 แอปพรีเมียม</h1>
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                            {categories.length} หมวด
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">ซื้อแอปพรีเมียม ราคาถูก รับ Email/Password ทันที</p>
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
                            placeholder="ค้นหาแอป เช่น Netflix, YouTube..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setFilterStock(!filterStock)}
                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer
              ${filterStock
                                ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                                : "bg-[#1a1a2e] border border-white/10 text-gray-400 hover:text-white hover:border-green-500/30"
                            }`}
                    >
                        ✅ พร้อมจำหน่าย
                    </button>
                </div>

                {/* Results count */}
                <p className="text-xs text-gray-600 mb-4">แสดง {filtered.length} จาก {categories.length} หมวด</p>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {filtered.map((cat) => {
                        const inStock = cat.products.filter((p) => parseInt(p.stock) > 0).length;
                        const hasStock = inStock > 0;

                        return (
                            <a
                                key={cat.name}
                                href={`/product/${cat.name}`}
                                className="group"
                            >
                                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#1a1a2e] mb-3">
                                    {/* Image */}
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                        <img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_4px_20px_rgba(249,115,22,0.15)]"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    `https://placehold.co/200x200/1a1a2e/f97316?text=${encodeURIComponent(cat.name)}&font=roboto`;
                                            }}
                                        />
                                    </div>

                                    {/* Stock badge */}
                                    <div className="absolute top-2.5 left-2.5">
                                        {hasStock ? (
                                            <span className="px-2 py-0.5 rounded-lg bg-green-500/90 text-white text-[10px] font-bold shadow-lg shadow-green-500/25">
                                                พร้อมขาย
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-lg bg-red-500/90 text-white text-[10px] font-bold shadow-lg shadow-red-500/25">
                                                สินค้าหมด
                                            </span>
                                        )}
                                    </div>

                                    {/* Package count */}
                                    <div className="absolute bottom-2.5 right-2.5">
                                        <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-gray-300 text-[10px] font-medium">
                                            {cat.products.length} แพ็กเกจ
                                        </span>
                                    </div>

                                    {/* In-stock count */}
                                    {hasStock && (
                                        <div className="absolute top-2.5 right-2.5">
                                            <span className="px-2 py-0.5 rounded-lg bg-orange-500/80 text-white text-[10px] font-bold">
                                                {inStock} พร้อม
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover effects */}
                                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300" />
                                    <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-orange-500/30 transition-all duration-300" />
                                </div>

                                {/* Name */}
                                <p className="text-white text-sm font-semibold text-center truncate group-hover:text-orange-400 transition-colors">
                                    {cat.name}
                                </p>

                                {/* Price */}
                                <p className="text-center mt-1">
                                    <span className="text-orange-400 text-xs font-bold">เริ่มต้น ฿{cat.lowestPrice.toFixed(0)}</span>
                                </p>

                                {/* Product list preview */}
                                <div className="mt-2 space-y-1 px-1">
                                    {cat.products.slice(0, 3).map((p) => (
                                        <div key={p.id} className="flex items-center justify-between text-[10px]">
                                            <span className="text-gray-500 truncate flex-1 mr-2">{p.name}</span>
                                            <span className={`font-bold ${parseInt(p.stock) > 0 ? "text-green-400" : "text-red-400"}`}>
                                                ฿{parseFloat(p.retailPrice).toFixed(0)}
                                            </span>
                                        </div>
                                    ))}
                                    {cat.products.length > 3 && (
                                        <p className="text-[10px] text-gray-600 text-center">+{cat.products.length - 3} แพ็กเกจอื่นๆ</p>
                                    )}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="text-gray-500">ไม่พบแอปที่ค้นหา</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
