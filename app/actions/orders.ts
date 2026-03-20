"use server";

import { cookies } from "next/headers";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export async function createOrderAction(productId: string, quantity: number = 1) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { error: "กรุณาเข้าสู่ระบบก่อนทำรายการสั่งซื้อ" };
    }

    try {
        const res = await fetch(`${API_URL}/orders/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                items: [
                    { productId, quantity } // ส่ง 1 item ไปในรอบนี้
                ]
            }),
            cache: 'no-store'
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return { error: data?.message || "ชำระเงินไม่สำเร็จ กรุณาตรวจสอบยอดเงินคงเหลือ" };
        }

        return { success: true, order: data };
    } catch (err: any) {
        return { error: err.message || "ไม่สามารถเชื่อมต่อระบบสั่งซื้อได้" };
    }
}
