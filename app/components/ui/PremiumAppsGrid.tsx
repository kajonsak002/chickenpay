"use client";

import { useState, useRef } from "react";
import { CategoryGroup } from "@/app/lib/products";

export default function PremiumAppsGrid({ categories }: { categories: CategoryGroup[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 300;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
        setTimeout(checkScroll, 350);
    };

    // Count total in-stock
    const totalStock = categories.reduce(
        (sum, cat) =>
            sum + cat.products.reduce((s, p) => s + parseInt(p.stock || "0"), 0),
        0
    );

    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 mb-16 relative w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-[var(--text-primary)] text-lg sm:text-xl font-bold flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full hidden sm:block"></span>
                        แอปพรีเมียม
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium hidden sm:flex">
                        {categories.length} หมวด
                    </span>
                    <a href="/apps" className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium hover:text-[var(--text-primary)] hover:bg-blue-500/20 transition-all cursor-pointer">
                        ดูทั้งหมด
                    </a>
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer
              ${canScrollLeft
                                ? "bg-orange-500 border-orange-500 text-[var(--text-primary)] hover:bg-orange-600"
                                : "bg-[#232342] border-[var(--border-primary)] text-[var(--text-secondary)] cursor-not-allowed"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer
              ${canScrollRight
                                ? "bg-orange-500 border-orange-500 text-[var(--text-primary)] hover:bg-orange-600"
                                : "bg-[#232342] border-[var(--border-primary)] text-[var(--text-secondary)] cursor-not-allowed"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scrollable Categories */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categories.map((cat) => {
                    const inStock = cat.products.filter(
                        (p) => parseInt(p.stock) > 0
                    ).length;
                    const totalProducts = cat.products.length;
                    const hasStock = inStock > 0;

                    return (
                        <a
                            key={cat.name}
                            href={`/product/${cat.name}`}
                            className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[190px] group transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-square mb-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] group-hover:border-blue-500/40 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                                {/* Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                `https://placehold.co/200x200/151522/3b82f6?text=${encodeURIComponent(cat.name)}&font=roboto`;
                                        }}
                                    />
                                </div>

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

                                {/* Product count */}
                                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-3 right-3 text-[var(--text-secondary)] text-[10px] font-medium z-10">
                                    {totalProducts} แพ็กเกจ
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-300 rounded-2xl pointer-events-none" />
                            </div>

                            {/* Name */}
                            <p className="text-[var(--text-primary)] text-xs sm:text-sm font-bold text-center truncate group-hover:text-blue-500 transition-colors px-1">
                                {cat.name}
                            </p>

                            {/* Price */}
                            <p className="text-center mt-1">
                                <span className="text-orange-400 text-xs font-bold">
                                    เริ่มต้น ฿{cat.lowestPrice.toFixed(0)}
                                </span>
                            </p>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
