"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { getAllProducts } from "../../lib/products";

const allProducts = getAllProducts();

export default function ProductDetailPage() {
    const params = useParams();
    const category = decodeURIComponent(params.category as string);

    const products = allProducts.filter((p) => p.category === category);
    const [selected, setSelected] = useState<string | null>(null);

    if (products.length === 0) {
        return (
            <main className="bg-[#0f0f1a] min-h-screen">
                <Navbar />
                <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                    <p className="text-5xl mb-4">😔</p>
                    <h1 className="text-white text-2xl font-bold mb-2">ไม่พบสินค้า</h1>
                    <p className="text-gray-500 text-sm mb-6">ไม่พบหมวดหมู่ &quot;{category}&quot;</p>
                    <a href="/apps" className="text-orange-400 hover:text-orange-300 text-sm underline">
                        กลับไปหน้าแอปพรีเมียม
                    </a>
                </div>
                <Footer />
            </main>
        );
    }

    const firstProduct = products[0];
    const selectedProduct = products.find((p) => p.id === selected) || null;
    const inStock = products.filter((p) => parseInt(p.stock) > 0);
    const outOfStock = products.filter((p) => parseInt(p.stock) <= 0);

    return (
        <main className="bg-[#0f0f1a] min-h-screen">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back */}
                <a href="/apps" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 text-sm mb-6 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    กลับไปหน้าแอปพรีเมียม
                </a>

                <div className="grid md:grid-cols-[320px_1fr] gap-8">
                    {/* Left — App card */}
                    <div>
                        <div className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] shadow-2xl shadow-black/50 p-10">
                            <img
                                src={firstProduct.img}
                                alt={category}
                                className="w-full aspect-square object-contain drop-shadow-[0_8px_30px_rgba(249,115,22,0.2)]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/300x300/1a1a2e/f97316?text=${encodeURIComponent(category)}&font=roboto`;
                                }}
                            />
                        </div>

                        {/* Info card */}
                        <div className="mt-4 p-4 rounded-xl bg-[#1a1a2e] border border-white/5">
                            <h1 className="text-xl font-bold text-white mb-1">{category}</h1>
                            <p className="text-gray-500 text-xs mb-3">{products.length} แพ็กเกจ</p>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                    <p className="text-[10px] text-gray-500">พร้อมขาย</p>
                                    <p className="text-green-400 font-bold text-sm">{inStock.length} แพ็กเกจ</p>
                                </div>
                                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                                    <p className="text-[10px] text-gray-500">สินค้าหมด</p>
                                    <p className="text-red-400 font-bold text-sm">{outOfStock.length} แพ็กเกจ</p>
                                </div>
                            </div>

                            {/* Price range — ราคาขายปลีก */}
                            <div className="mt-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                                <p className="text-[10px] text-gray-500">ราคา</p>
                                <p className="text-orange-400 font-bold text-sm">
                                    ฿{Math.min(...products.map((p) => parseFloat(p.retailPrice))).toFixed(0)} — ฿{Math.max(...products.map((p) => parseFloat(p.retailPrice))).toFixed(0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right — Packages */}
                    <div>
                        <h2 className="text-lg font-bold text-white mb-4">เลือกแพ็กเกจ</h2>

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
                                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer
                          ${isSelected
                                                        ? "bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10"
                                                        : "bg-[#1a1a2e] border-white/5 hover:border-orange-500/20 hover:bg-[#1e1e35]"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0 mr-3">
                                                        <p className={`text-sm font-medium ${isSelected ? "text-orange-300" : "text-white"}`}>
                                                            {product.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            <span className="text-[10px] text-green-400 font-medium bg-green-500/10 px-1.5 py-0.5 rounded">
                                                                คงเหลือ {product.stock} ชิ้น
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className={`text-lg font-bold ${isSelected ? "text-orange-400" : "text-orange-400/80"}`}>
                                                            ฿{retailPrice.toFixed(0)}
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
                                                className="w-full text-left p-4 rounded-xl border bg-[#1a1a2e] border-white/5"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0 mr-3">
                                                        <p className="text-sm font-medium text-gray-400">
                                                            {product.name}
                                                        </p>
                                                        <span className="text-[10px] text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                            สินค้าหมด
                                                        </span>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="text-lg font-bold text-gray-600">
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
                            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-b from-[#1e1e35] to-[#1a1a2e] border border-orange-500/20 sticky bottom-4">
                                <h3 className="text-white font-bold mb-4">สั่งซื้อสินค้า</h3>

                                {/* Summary */}
                                <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 text-xs">สินค้า</span>
                                        <span className="text-white text-xs font-medium truncate max-w-[220px]">
                                            {selectedProduct.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 text-xs">คงเหลือ</span>
                                        <span className="text-green-400 text-xs font-medium">
                                            {selectedProduct.stock} ชิ้น
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-white/5 pt-2">
                                        <span className="text-gray-400 text-xs">ราคา</span>
                                        <span className="text-orange-400 text-xl font-bold">
                                            ฿{parseFloat(selectedProduct.retailPrice).toFixed(0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                    <p className="text-[10px] text-blue-400">
                                        💡 หลังชำระเงิน ระบบจะส่ง Email/Password ให้อัตโนมัติ
                                    </p>
                                </div>

                                {/* Buy button */}
                                <button className="w-full mt-4 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                                    ซื้อเลย ฿{parseFloat(selectedProduct.retailPrice).toFixed(0)}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
