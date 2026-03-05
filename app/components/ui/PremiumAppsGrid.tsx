"use client";

import { useState, useRef } from "react";
import { getProductsByCategory } from "@/app/lib/products";

const categories = getProductsByCategory();

export default function PremiumAppsGrid() {
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
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-white text-lg sm:text-xl font-bold">
                        แอปพรีเมียม
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-medium">
                        {categories.length} หมวด
                    </span>
                    <a href="/apps" className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium hover:text-white hover:bg-orange-500/20 transition-all cursor-pointer">
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
                                ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                                : "bg-[#232342] border-white/10 text-gray-600 cursor-not-allowed"
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
                                ? "bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
                                : "bg-[#232342] border-white/10 text-gray-600 cursor-not-allowed"
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
                            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] group"
                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-square mb-3 bg-[#1a1a2e]">
                                {/* Image */}
                                <div className="w-full h-full flex items-center justify-center p-6">
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
                                <div className="absolute bottom-2.5 right-2.5">
                                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-gray-300 text-[10px] font-medium">
                                        {totalProducts} แพ็กเกจ
                                    </span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300 rounded-2xl" />

                                {/* Border glow on hover */}
                                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-orange-500/30 transition-all duration-300" />
                            </div>

                            {/* Name */}
                            <p className="text-white text-sm font-semibold text-center truncate group-hover:text-orange-400 transition-colors">
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
