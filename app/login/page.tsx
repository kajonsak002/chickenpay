"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NavbarClient from "../components/ui/NavbarClient";
import Footer from "../components/ui/Footer";
import { loginAction } from "../actions/auth";
import Swal from "sweetalert2";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get("success");
        if (success === "registered") {
            Swal.fire({
                icon: "success",
                title: "สมัครสมาชิกสำเร็จ!",
                text: "กรุณาเข้าสู่ระบบด้วยบัญชีที่คุณสร้าง",
                background: "#1e1e2d",
                color: "#fff",
                confirmButtonColor: "#f97316",
                confirmButtonText: "ตกลง",
                customClass: { popup: 'rounded-2xl border border-green-500/20 shadow-2xl shadow-green-500/10' }
            });
        }
    }, [searchParams]);

    useEffect(() => {
        if (state?.error) {
            Swal.fire({
                icon: "error",
                title: "เข้าสู่ระบบไม่สำเร็จ",
                text: state.error,
                background: "#1e1e2d",
                color: "#fff",
                confirmButtonColor: "#ef4444",
                confirmButtonText: "ลองอีกครั้ง",
                customClass: { popup: 'rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/10' }
            });
        }
    }, [state?.error]);

    return (
        <main className="bg-[var(--bg-primary)] min-h-screen flex flex-col">
            <NavbarClient />
            <div className="flex-1 flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">เข้าสู่ระบบ</h1>
                        <p className="text-[var(--text-secondary)] text-sm">ยินดีต้อนรับกลับเข้าสู่ ChickenPay</p>
                    </div>

                    <form action={formAction} className="space-y-4">
                        <div>
                            <label className="block text-[var(--text-secondary)] text-sm font-medium mb-1.5 ml-1">อีเมล</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-[var(--text-secondary)] text-sm font-medium mb-1.5 ml-1">รหัสผ่าน</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                        ยังไม่มีบัญชีใช่หรือไม่? <a href="/register" className="text-orange-500 font-medium hover:underline">สมัครสมาชิกที่นี่</a>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
