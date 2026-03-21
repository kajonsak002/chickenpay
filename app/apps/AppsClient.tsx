"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Smartphone, SearchX } from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Pagination from "../components/ui/Pagination";
import { CategoryGroup } from "../lib/products";

export default function AppsClient({ categories }: { categories: CategoryGroup[] }) {
    const [search, setSearch] = useState("");
    const [filterStock, setFilterStock] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 15;

    const filtered = categories.filter((cat) => {
        const matchSearch = cat.name.toLowerCase().includes(search.toLowerCase());
        const matchStock = !filterStock || cat.products.some((p) => parseInt(p.stock) > 0);
        return matchSearch && matchStock;
    });

    const totalPages = Math.ceil(filtered.length / LIMIT);
    const currentCategories = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb />
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                        <Smartphone className="text-orange-500" size={32} /> แอปพรีเมียม
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                        {categories.length} หมวด
                    </span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm">ซื้อแอปพรีเมียม ราคาถูก รับ Email/Password ทันที</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ค้นหาแอป เช่น Netflix, YouTube..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                    />
                </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-[var(--text-secondary)] mb-4">แสดง {(currentPage - 1) * LIMIT + 1} - {Math.min(currentPage * LIMIT, filtered.length)} จาก {filtered.length} หมวด</p>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {currentCategories.map((cat, index) => {
                    const inStock = cat.products.filter((p) => parseInt(p.stock) > 0).length;
                    const hasStock = inStock > 0;

                    return (
                        <Link
                            key={cat.name}
                            href={`/product/${cat.name}`}
                            aria-label={`หมวดหมู่ ${cat.name}`}
                            className="group transition-all duration-300 hover:-translate-y-1 block"
                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[var(--bg-secondary)] mb-3 border border-[var(--border-primary)] group-hover:border-blue-500/40 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                                {/* Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={cat.img}
                                            alt={cat.name}
                                            fill
                                            priority={index < 5}
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                            className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
                                        />
                                    </div>
                                </div>

                                {/* gradient overlay */}
                                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/40 to-transparent pointer-events-none" />


                                {/* Stock badge */}
                                <div className="absolute top-2.5 left-2.5 z-10">
                                    {hasStock ? (
                                        <span className="px-2 py-0.5 rounded-lg bg-green-500/90 text-white text-[10px] font-bold shadow-lg shadow-green-500/30">
                                            พร้อมขาย
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded-lg bg-red-500/90 text-white text-[10px] font-bold shadow-lg shadow-red-500/30">
                                            สินค้าหมด
                                        </span>
                                    )}
                                </div>

                                {/* Package count */}
                                <div className="absolute bottom-3 right-3 text-[var(--text-secondary)] text-[10px] font-medium z-10">
                                    {cat.products.length} แพ็กเกจ
                                </div>

                                {/* In-stock count */}
                                {hasStock && (
                                    <div className="absolute top-2.5 right-2.5 z-10">
                                        <span className="px-2 py-0.5 rounded-lg bg-blue-500/80 text-white text-[10px] font-bold shadow-lg shadow-blue-500/30">
                                            {inStock} พร้อม
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* Name */}
                            <p className="text-[var(--text-primary)] text-sm font-bold text-center truncate group-hover:text-orange-400 transition-colors">
                                {cat.name}
                            </p>

                            {/* Price */}
                            <p className="text-center mt-1">
                                <span className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] text-xs font-bold">เริ่มต้น ฿{cat.lowestPrice.toFixed(0)}</span>
                            </p>

                            {/* Product list preview */}
                            <div className="mt-2 space-y-1 px-1">
                                {cat.products.slice(0, 3).map((p) => (
                                    <div key={p.id} className="flex items-center justify-between text-[10px]">
                                        <span className="text-[var(--text-secondary)] truncate flex-1 mr-2">{p.name}</span>
                                        <span className={`font-bold ${parseInt(p.stock) > 0 ? "text-green-400" : "text-red-400"}`}>
                                            ฿{parseFloat(p.retailPrice).toFixed(0)}
                                        </span>
                                    </div>
                                ))}
                                {cat.products.length > 3 && (
                                    <p className="text-[10px] text-[var(--text-secondary)] text-center">+{cat.products.length - 3} แพ็กเกจอื่นๆ</p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center">
                    <SearchX size={48} className="text-orange-500/50 mb-4" />
                    <p className="text-[var(--text-secondary)] text-lg">ไม่พบแอปที่ค้นหา</p>
                </div>
            )}
            {filtered.length > 0 && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
}
