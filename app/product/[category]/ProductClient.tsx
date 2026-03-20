"use client";

import { useState } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useParams, useRouter } from "next/navigation";
import { Product } from "../../lib/products";
import { createOrderAction } from "../../actions/orders";
import Swal from "sweetalert2";

export default function ProductClient({ allProducts }: { allProducts: Product[] }) {
    const params = useParams();
    const router = useRouter();
    const category = decodeURIComponent(params.category as string);

    const products = allProducts.filter((p) => p.category === category);
    const [selected, setSelected] = useState<string | null>(null);
    const [isPurchasing, setIsPurchasing] = useState(false);

    const firstProduct = products[0];
    const selectedProduct = products.find((p) => p.id === selected) || null;
    const inStock = products.filter((p) => parseInt(p.stock) > 0);
    const outOfStock = products.filter((p) => parseInt(p.stock) <= 0);

    const handlePurchase = async () => {
        if (!selectedProduct) return;

        setIsPurchasing(true);
        const result = await createOrderAction(selectedProduct.id, 1);
        setIsPurchasing(false);

        if (result.error) {
            Swal.fire({
                icon: "error",
                title: "ซื้อสินค้าไม่สำเร็จ",
                text: result.error,
                background: "#1e1e2d",
                color: "#fff",
                confirmButtonColor: "#ef4444",
                confirmButtonText: "ตกลง",
                customClass: { popup: 'rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/10' }
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "สั่งซื้อสำเร็จ!",
                text: "รับข้อมูลบัญชีได้ที่หน้าประวัติการสั่งซื้อ",
                background: "#1e1e2d",
                color: "#fff",
                confirmButtonColor: "#3b82f6",
                confirmButtonText: "ดูบัญชีผู้ใช้",
                customClass: { popup: 'rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10' }
            }).then(() => {
                router.push("/profile");
                router.refresh();
            });
        }
    };

    if (products.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                <p className="text-5xl mb-4">😔</p>
                <h1 className="text-[var(--text-primary)] text-2xl font-bold mb-2">ไม่พบสินค้า</h1>
                <p className="text-[var(--text-secondary)] text-sm mb-6">ไม่พบหมวดหมู่ &quot;{category}&quot;</p>
                <a href="/apps" className="text-orange-400 hover:text-orange-300 text-sm underline">
                    กลับไปหน้าแอปพรีเมียม
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={[
                { label: "หน้าแรก", href: "/" },
                { label: "แอปพรีเมียม", href: "/apps" },
                { label: category }
            ]} />

            <div className="grid md:grid-cols-[320px_1fr] gap-8">
                {/* Left — App card */}
                <div>
                    <div className="relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] shadow-2xl shadow-black/50 p-10 border border-[var(--border-primary)]">
                        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                        <img
                            src={firstProduct.img}
                            alt={category}
                            className="w-full aspect-square object-contain drop-shadow-[0_8px_30px_rgba(59,130,246,0.2)] relative z-10"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/300x300/151522/3b82f6?text=${encodeURIComponent(category)}&font=roboto`;
                            }}
                        />
                    </div>

                    {/* Info card */}
                    <div className="mt-4 p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1">{category}</h1>
                        <p className="text-[var(--text-secondary)] text-sm mb-4">{products.length} แพ็กเกจ</p>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-green-500/5 border border-green-500/10 flex flex-col justify-center">
                                <p className="text-[11px] text-[var(--text-secondary)] mb-1">สถานะ</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                                    <p className="text-green-500 font-bold text-sm">{inStock.length} พร้อมขาย</p>
                                </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 flex flex-col justify-center">
                                <p className="text-[11px] text-[var(--text-secondary)] mb-1">สถานะ</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <p className="text-red-500 font-bold text-sm">{outOfStock.length} สินค้าหมด</p>
                                </div>
                            </div>
                        </div>

                        {/* Price range */}
                        <div className="mt-3 p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/10">
                            <p className="text-[11px] text-[var(--text-secondary)] mb-1">ช่วงราคา</p>
                            <p className="text-blue-500 font-bold text-base">
                                ฿{Math.min(...products.map((p) => parseFloat(p.retailPrice))).toFixed(0)} — ฿{Math.max(...products.map((p) => parseFloat(p.retailPrice))).toFixed(0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right — Packages */}
                <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">เลือกแพ็กเกจ</h2>

                    {/* In-stock packages */}
                    {inStock.length > 0 && (
                        <div className="mb-6">
                            <p className="text-xs text-green-400 font-medium mb-2.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                พร้อมจำหน่าย ({inStock.length})
                            </p>
                            <div className="grid gap-2.5">
                                {inStock.map((product) => {
                                    const isSelected = selected === product.id;
                                    const retailPrice = parseFloat(product.retailPrice);

                                    return (
                                        <button
                                            key={product.id}
                                            onClick={() => setSelected(product.id)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer group relative overflow-hidden
                      ${isSelected
                                                    ? "bg-blue-500/10 border-blue-500/50 shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                                                    : "bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-blue-500/30 hover:shadow-[0_4px_15px_rgba(59,130,246,0.05)] hover:-translate-y-0.5"
                                                }`}
                                        >
                                            {/* Selection Indicator glow */}
                                            {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />}

                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex-1 min-w-0 mr-3">
                                                    <p className={`text-sm font-bold transition-colors ${isSelected ? "text-blue-500" : "text-[var(--text-primary)] group-hover:text-blue-400"}`}>
                                                        {product.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-md shadow-sm">
                                                            คงเหลือ {product.stock} ชิ้น
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className={`text-lg font-bold transition-colors ${isSelected ? "text-blue-500" : "text-[var(--text-primary)]"}`}>
                                                        ฿{retailPrice.toFixed(0)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Selection indicator & details */}
                                            <div className="flex items-center gap-2 mt-3 relative z-10">
                                                <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300
                        ${isSelected ? "border-blue-500 bg-blue-500" : "border-[var(--text-muted)] group-hover:border-blue-500/50"}`}>
                                                    {isSelected && (
                                                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`text-[10px] font-medium transition-colors ${isSelected ? "text-blue-500" : "text-[var(--text-muted)]"}`}>
                                                    ID: #{product.id}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Out of stock packages */}
                    {outOfStock.length > 0 && (
                        <div>
                            <p className="text-xs text-red-400/70 font-medium mb-2.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                สินค้าหมด ({outOfStock.length})
                            </p>
                            <div className="grid gap-2.5 opacity-50">
                                {outOfStock.map((product) => {
                                    const retailPrice = parseFloat(product.retailPrice);

                                    return (
                                        <div
                                            key={product.id}
                                            className="w-full text-left p-4 rounded-xl border bg-[var(--bg-secondary)] border-[var(--border-primary)]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0 mr-3">
                                                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                                                        {product.name}
                                                    </p>
                                                    <span className="text-[10px] text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                        สินค้าหมด
                                                    </span>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-lg font-bold text-[var(--text-secondary)]">
                                                        ฿{retailPrice.toFixed(0)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Order section */}
                    {selectedProduct && (
                        <div className="mt-6 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-[0_8px_30px_rgba(59,130,246,0.08)] sticky bottom-4 z-99">
                            <h3 className="text-[var(--text-primary)] font-bold mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-blue-500 rounded-full hidden sm:block"></span>
                                สั่งซื้อสินค้า
                            </h3>

                            {/* Summary */}
                            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-4">
                                <div className="flex justify-between items-center mb-2.5">
                                    <span className="text-[var(--text-secondary)] text-sm">สินค้า</span>
                                    <span className="text-[var(--text-primary)] text-sm font-medium truncate max-w-[220px]">
                                        {selectedProduct.name}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2.5">
                                    <span className="text-[var(--text-secondary)] text-sm">คงเหลือ</span>
                                    <span className="text-green-500 text-sm font-bold">
                                        {selectedProduct.stock} ชิ้น
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-t border-[var(--border-primary)] pt-3">
                                    <span className="text-[var(--text-secondary)] text-sm">ราคา</span>
                                    <span className="text-blue-500 text-xl font-bold">
                                        ฿{parseFloat(selectedProduct.retailPrice).toFixed(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Note */}
                            <div className="p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] shadow-sm">
                                <p className="text-[11px] text-[var(--text-secondary)] font-medium flex items-start gap-2">
                                    <span className="text-blue-500 text-base leading-none">💡</span>
                                    <span>หลังชำระเงิน ระบบจะส่ง <span className="text-[var(--text-primary)]">Email/Password</span> ให้อัตโนมัติในส่วนของประวัติการสั่งซื้อ</span>
                                </p>
                            </div>

                            {/* Buy button */}
                            <button
                                onClick={handlePurchase}
                                disabled={isPurchasing}
                                className={`w-full mt-5 py-3.5 rounded-xl text-sm font-bold shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer text-white
                                    ${isPurchasing
                                        ? "bg-blue-800 opacity-70 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 active:scale-95"}`}
                            >
                                {isPurchasing ? "กำลังสั่งซื้อ..." : `ชำระเงิน ฿${parseFloat(selectedProduct.retailPrice).toFixed(0)}`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
