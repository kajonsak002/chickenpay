"use server";

import { cookies } from "next/headers";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export async function uploadSlipAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { error: "ไม่พบ Session กรุณาเข้าสู่ระบบใหม่" };
    }

    try {
        const res = await fetch(`${API_URL}/topup/verify-slip`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
            cache: 'no-store'
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return { error: data?.message || "ระบบปฏิเสธสลิปการโอนเงิน กรุณาลองใหม่" };
        }

        return { success: true, message: "ยอดเงินได้รับการยืนยันเข้าสู่ระบบแล้ว!" };
    } catch (err: any) {
        return { error: err.message || "ไม่สามารถเชื่อมต่อระบบตรวจสอบสลิปได้" };
    }
}
