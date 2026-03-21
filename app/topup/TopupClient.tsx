"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useRouter } from "next/navigation";
// @ts-ignore
import generatePayload from "promptpay-qr";
import { QRCodeSVG } from "qrcode.react";
import Swal from "sweetalert2";
import { Loader2, QrCode, UploadCloud, CheckCircle2 } from "lucide-react";

const PRESET_AMOUNTS = [50, 100, 300, 500, 1000, 2000];

export default function TopupClient() {
    const router = useRouter();
    const [amount, setAmount] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Slip Upload States
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // TODO: เปลี่ยนเบอร์พร้อมเพย์ที่นี่ (ใส่เป็นเบอร์มือถือ 10 หลัก หรือเลขบัตรประชาชน 13 หลัก)
    const PROMPTPAY_ID = "0651209830";

    const handleGenerate = () => {
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'ไม่ถูกต้อง',
                text: 'กรุณากรอกจำนวนเงินให้ถูกต้องและมากกว่า 0',
                background: '#1e1e2d', color: '#fff', confirmButtonColor: '#f97316',
                customClass: { popup: 'rounded-2xl border border-orange-500/20' }
            });
            return;
        }

        setIsGenerating(true);
        setTimeout(() => {
            const payload = generatePayload(PROMPTPAY_ID, { amount: amt });
            setQrCodeData(payload);
            setIsGenerating(false);
        }, 600);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSlipFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleConfirm = async () => {
        if (!slipFile) {
            Swal.fire({
                icon: 'warning',
                title: 'ไม่พบสลิป',
                text: 'กรุณาแนบภาพสลิปการโอนเงินก่อนกดยืนยัน',
                background: '#1e1e2d', color: '#fff', confirmButtonColor: '#f97316',
                customClass: { popup: 'rounded-2xl border border-orange-500/20' }
            });
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", slipFile);

            // Call Next.js API Route internally
            const res = await fetch("/api/topup", {
                method: "POST",
                body: formData
            });

            const result = await res.json();

            if (!res.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'ตรวจสอบสลิปไม่ผ่าน',
                    text: result.message || 'อัปโหลดสลิปไม่สำเร็จ',
                    background: '#1e1e2d', color: '#fff', confirmButtonColor: '#ef4444',
                    customClass: { popup: 'rounded-2xl border border-red-500/20' }
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'เติมเงินสำเร็จ!',
                    text: result.message || "อัปโหลดและยืนยันยอดเงินสำเร็จ ระบบอัปเดตกระเป๋าเงินแล้ว",
                    background: '#1e1e2d', color: '#fff', confirmButtonColor: '#3b82f6',
                    customClass: { popup: 'rounded-2xl border border-blue-500/20' }
                }).then(() => {
                    router.push("/profile");
                    router.refresh();
                });
            }

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ระบบขัดข้อง',
                text: error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ",
                background: '#1e1e2d', color: '#fff', confirmButtonColor: '#ef4444',
                customClass: { popup: 'rounded-2xl border border-red-500/20' }
            });
        } finally {
            setIsUploading(false);
        }
    };

    const cancelTransaction = () => {
        setQrCodeData(null);
        setSlipFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Breadcrumb */}
            <div className="w-full flex justify-start mb-6">
                <Breadcrumb />
            </div>

            {/* Header Text */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    Instant Top-up
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                    เติมเงินเข้าระบบ
                </h1>
                <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
                    สแกนชำระผ่านแอปพลิเคชันธนาคาร (รองรับทุกธนาคารในไทย) ระบบจะตรวจสอบและเพิ่มยอดเงินอัตโนมัติเมื่อแนบสลิป
                </p>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-xl bg-[#0a0a14] rounded-3xl border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[80%] h-[100%] rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6">
                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-3">ระบุจำนวนเงินที่ต้องการเติม (บาท)</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold text-orange-500">
                                ฿
                            </span>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={amount}
                                aria-label="กรอกจำนวนเงินที่ต้องการเติม"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    cancelTransaction();
                                }}
                                disabled={isGenerating || qrCodeData !== null}
                                placeholder="0.00"
                                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Preset Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        {PRESET_AMOUNTS.map((amt) => (
                            <button
                                key={amt}
                                aria-label={`เติมเงิน ${amt} บาท`}
                                onClick={() => {
                                    setAmount(amt.toString());
                                    cancelTransaction();
                                }}
                                disabled={isGenerating || qrCodeData !== null}
                                className="h-12 rounded-xl bg-white/5 border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400 text-gray-300 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {amt}
                            </button>
                        ))}
                    </div>

                    {/* Generate Action */}
                    {!qrCodeData && (
                        <div className="pt-4 mt-2 border-t border-white/5 flex justify-center">
                            <button
                                onClick={handleGenerate}
                                aria-label="สร้าง QR Code เพื่อชำระเงิน"
                                disabled={isGenerating || !amount}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin -ml-1 mr-2 text-white" />
                                        กำลังสร้าง...
                                    </>
                                ) : (
                                    <>
                                        <QrCode className="w-6 h-6" />
                                        สร้าง QR Code รับเงิน
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Scan QR & Upload Section */}
            {qrCodeData && (
                <div className="w-full max-w-sm mt-8 animate-in slide-in-from-bottom-10 fade-in duration-500 space-y-4">

                    {/* QR Code Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group border-4 border-white/20">
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-3">
                                <Image src="/logo.png" width={32} height={32} className="opacity-80 object-contain" alt="Logo" />
                                <span className="text-[#133F6E] font-black text-2xl tracking-tight">Prompt<span className="text-[#05A3BF]">Pay</span></span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-6 bg-white border-2 border-dashed border-gray-200 p-2 rounded-xl">
                            <QRCodeSVG
                                value={qrCodeData}
                                size={220}
                                level="M"
                                includeMargin={false}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm font-medium mb-1">ยอดเงินที่ต้องชำระ</p>
                            <p className="text-4xl font-black text-gray-900 border-b-2 border-dashed border-gray-200 pb-4 inline-block">
                                ฿{parseFloat(amount).toFixed(2)}
                            </p>
                        </div>

                        <div className="bg-[#133F6E]/5 rounded-xl p-4 mt-6 text-center">
                            <p className="text-sm font-bold text-[#133F6E]">ชื่อบัญชี: ขจรศักดิ์ ลี้พงษ์กุล</p>
                            <p className="text-xs text-gray-500 font-medium mt-1">รหัสอ้างอิง: REF{(Math.random() * 1000000).toFixed(0)}</p>
                        </div>
                    </div>

                    {/* Upload Slip Validation Box */}
                    <div className="bg-[#13131f] rounded-3xl p-6 border border-white/10 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">แนบสลิปเพื่อยืนยันการชำระเงิน</h3>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-orange-500/50 transition-all relative overflow-hidden">
                            {previewUrl ? (
                                <Image src={previewUrl} alt="Slip preview" fill unoptimized className="absolute inset-0 w-full h-full object-cover opacity-60" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400"><span className="font-semibold text-orange-400">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง</p>
                                </div>
                            )}
                            <input id="dropzone-file" aria-label="อัปโหลดหลักฐานการโอนเงิน" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
                        </label>

                        {previewUrl && (
                            <p className="text-xs text-green-400 text-center mt-3 font-semibold flex items-center justify-center gap-1">
                                <CheckCircle2 size={16} />
                                แนบไฟล์สำเร็จแล้ว
                            </p>
                        )}

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={cancelTransaction}
                                disabled={isUploading}
                                aria-label="ยกเลิกการเติมเงิน"
                                className="px-5 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-red-400 transition-all disabled:opacity-50"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleConfirm}
                                aria-label="อัปโหลดและยืนยันยอดเงิน"
                                disabled={!slipFile || isUploading}
                                className="flex-1 py-3 rounded-xl bg-[#22c55e] text-white font-bold text-sm shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 h-5 w-5 text-white" />
                                        กำลังยืนยัน...
                                    </>
                                ) : "อัปโหลดและยืนยัน"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
