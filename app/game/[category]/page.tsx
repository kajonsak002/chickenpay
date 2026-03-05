"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { GAMES } from "../../lib/games";

interface Denomination {
    type_code: string;
    price: string;
    info: string;
}

interface GameDetail {
    name: string;
    category: string;
    img: string;
    img_icon: string;
    discount: string;
    denominationData: Denomination[];
    server: { name: string; code: string }[];
    format_id: string;
}

export default function GameDetailPage() {
    const params = useParams();
    const category = params.category as string;

    const [game, setGame] = useState<GameDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Denomination | null>(null);
    const [gameId, setGameId] = useState("");
    const [serverId, setServerId] = useState("");

    // Get static data first
    const staticGame = GAMES.find((g) => g.category === category);

    useEffect(() => {
        fetch(`/api/game/${category}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setGame(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [category]);

    // Strip HTML tags for clean display
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    };

    // Parse denomination info to get item description
    const parseInfo = (info: string) => {
        const clean = stripHtml(info);
        return clean;
    };

    return (
        <main className="bg-[#0f0f1a] min-h-screen">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <a
                    href="/games"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 text-sm mb-6 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    กลับไปหน้าเกมทั้งหมด
                </a>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                        <p className="text-gray-500 mt-4 text-sm">กำลังโหลดข้อมูลเกม...</p>
                    </div>
                )}

                {!loading && (
                    <div className="grid md:grid-cols-[320px_1fr] gap-8">
                        {/* Left — Game card */}
                        <div>
                            <div className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] shadow-2xl shadow-black/50">
                                <img
                                    src={staticGame?.img || game?.img || ""}
                                    alt={game?.name || staticGame?.name || ""}
                                    className="w-full aspect-[3/4] object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://placehold.co/300x400/1a1a2e/f97316?text=${encodeURIComponent(staticGame?.name || category)}&font=roboto`;
                                    }}
                                />

                                {/* Discount badge */}
                                {staticGame && parseFloat(staticGame.discount) > 0 && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/30">
                                            ลด {staticGame.discount}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Game info below image */}
                            <div className="mt-4 p-4 rounded-xl bg-[#1a1a2e] border border-white/5">
                                <h1 className="text-xl font-bold text-white mb-1">
                                    {game?.name || staticGame?.name}
                                </h1>
                                <p className="text-gray-500 text-xs mb-3">
                                    {staticGame?.packagesCount || game?.denominationData?.length || 0} แพ็กเกจ
                                </p>

                                {/* Quick stats */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                                        <p className="text-[10px] text-gray-500">ส่วนลด</p>
                                        <p className="text-orange-400 font-bold text-sm">
                                            {parseFloat(staticGame?.discount || game?.discount || "0") > 0
                                                ? `${staticGame?.discount || game?.discount}%`
                                                : "ราคาปกติ"}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                        <p className="text-[10px] text-gray-500">สถานะ</p>
                                        <p className="text-green-400 font-bold text-sm">พร้อมขาย</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — Denomination packages */}
                        <div>
                            <h2 className="text-lg font-bold text-white mb-4">เลือกแพ็กเกจ</h2>

                            {game?.denominationData ? (
                                <div className="grid gap-2.5">
                                    {game.denominationData.map((denom) => {
                                        const isSelected = selected?.type_code === denom.type_code;
                                        const originalPrice = parseFloat(denom.type_code) || 0;
                                        const salePrice = parseFloat(denom.price);
                                        const hasSaving = originalPrice > 0 && originalPrice > salePrice;

                                        return (
                                            <button
                                                key={denom.type_code}
                                                onClick={() => setSelected(denom)}
                                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group
                          ${isSelected
                                                        ? "bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10"
                                                        : "bg-[#1a1a2e] border-white/5 hover:border-orange-500/20 hover:bg-[#1e1e35]"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0 mr-3">
                                                        <p className={`text-sm font-medium truncate ${isSelected ? "text-orange-300" : "text-white"}`}>
                                                            {parseInfo(denom.info).substring(0, 60)}
                                                            {parseInfo(denom.info).length > 60 ? "..." : ""}
                                                        </p>
                                                        {isSelected && (
                                                            <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                                                                {parseInfo(denom.info)}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="text-right flex-shrink-0">
                                                        {hasSaving && (
                                                            <p className="text-[10px] text-gray-600 line-through">
                                                                ฿{originalPrice.toFixed(2)}
                                                            </p>
                                                        )}
                                                        <p className={`text-base font-bold ${isSelected ? "text-orange-400" : "text-orange-400/80"}`}>
                                                            ฿{salePrice.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Selection indicator */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                            ${isSelected ? "border-orange-500 bg-orange-500" : "border-gray-600"}`}>
                                                        {isSelected && (
                                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-[10px] ${isSelected ? "text-orange-400" : "text-gray-600"}`}>
                                                        รหัส: {denom.type_code}
                                                    </span>
                                                    {hasSaving && (
                                                        <span className="text-[10px] text-red-400 font-bold ml-auto">
                                                            ประหยัด ฿{(originalPrice - salePrice).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-sm">ไม่สามารถโหลดข้อมูลแพ็กเกจได้</p>
                                </div>
                            )}

                            {/* Order section */}
                            {selected && (
                                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-b from-[#1e1e35] to-[#1a1a2e] border border-orange-500/20">
                                    <h3 className="text-white font-bold mb-4">สั่งซื้อสินค้า</h3>

                                    {/* Player ID input */}
                                    <div className="mb-3">
                                        <label className="text-xs text-gray-400 mb-1.5 block">
                                            Player ID / User ID
                                        </label>
                                        <input
                                            type="text"
                                            value={gameId}
                                            onChange={(e) => setGameId(e.target.value)}
                                            placeholder="กรอก ID ของคุณ"
                                            className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                                        />
                                    </div>

                                    {/* Server input (if game has servers) */}
                                    {game?.server && game.server.length > 0 && (
                                        <div className="mb-3">
                                            <label className="text-xs text-gray-400 mb-1.5 block">
                                                เซิร์ฟเวอร์
                                            </label>
                                            <select
                                                value={serverId}
                                                onChange={(e) => setServerId(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                                            >
                                                <option value="">เลือกเซิร์ฟเวอร์</option>
                                                {game.server.map((s) => (
                                                    <option key={s.code} value={s.code}>
                                                        {s.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {/* Summary */}
                                    <div className="mt-4 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-gray-400 text-xs">แพ็กเกจที่เลือก</span>
                                            <span className="text-white text-xs font-medium truncate max-w-[200px]">
                                                {parseInfo(selected.info).substring(0, 40)}...
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-xs">ราคา</span>
                                            <span className="text-orange-400 text-lg font-bold">
                                                ฿{parseFloat(selected.price).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Buy button */}
                                    <button
                                        disabled={!gameId}
                                        className={`w-full mt-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer
                      ${gameId
                                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
                                                : "bg-gray-800 text-gray-600 cursor-not-allowed"
                                            }`}
                                    >
                                        {gameId ? `ซื้อเลย ฿${parseFloat(selected.price).toFixed(2)}` : "กรุณากรอก ID ก่อน"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
