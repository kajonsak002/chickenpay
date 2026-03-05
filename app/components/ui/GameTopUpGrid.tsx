"use client";

import { useState, useRef } from "react";
import { GAMES } from "@/app/lib/games";

export default function GameTopUpGrid() {
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

    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-white text-lg sm:text-xl font-bold">เติมเกมออนไลน์</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-medium">
                        {GAMES.length} เกม
                    </span>
                    <a href="/games" className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium hover:text-white hover:bg-orange-500/20 transition-all cursor-pointer">
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

            {/* Scrollable Games */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {GAMES.map((game) => {
                    const discount = parseFloat(game.discount);
                    return (
                        <a
                            key={game.category}
                            href={`/game/${game.category}`}
                            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] group"
                        >
                            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3 bg-[#1a1a2e]">
                                {/* Image */}
                                <img
                                    src={game.img}
                                    alt={game.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            `https://placehold.co/300x400/1a1a2e/f97316?text=${encodeURIComponent(game.name)}&font=roboto`;
                                    }}
                                />

                                {/* Discount ribbon */}
                                {discount > 0 && (
                                    <div className="absolute top-0 right-0">
                                        <div
                                            className="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-bl-xl"
                                            style={{
                                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)",
                                                paddingBottom: "8px",
                                            }}
                                        >
                                            ลด {game.discount}%
                                        </div>
                                    </div>
                                )}

                                {/* Package count bottom-left */}
                                <div className="absolute bottom-2.5 left-2.5">
                                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-gray-300 text-[10px] font-medium">
                                        {game.packagesCount} แพ็กเกจ
                                    </span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            </div>

                            {/* Name */}
                            <p className="text-white text-sm font-medium text-center truncate group-hover:text-orange-400 transition-colors">
                                {game.name}
                            </p>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
