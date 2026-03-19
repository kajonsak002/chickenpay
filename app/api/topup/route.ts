import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "ไม่พบ Session กรุณาเข้าสู่ระบบใหม่" },
            { status: 401 }
        );
    }

    try {
        // รับ FormData จาก Client
        const formData = await req.formData();
        
        // ส่งต่อไปยัง Backend API
        const backendRes = await fetch(`${API_URL}/topup/verify-slip`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
                // ไม่ต้องเซ็ต Content-Type เป็น multipart/form-data เพราะ fetch จะจัดการ boundary ของ FormData ให้อัตโนมัติ
            },
            body: formData,
        });

        const data = await backendRes.json().catch(() => null);

        if (!backendRes.ok) {
            return NextResponse.json(
                { message: data?.message || "ระบบปฏิเสธสลิปการโอนเงิน กรุณาลองใหม่" },
                { status: backendRes.status }
            );
        }

        return NextResponse.json({ success: true, message: "ยอดเงินได้รับการยืนยันเข้าสู่ระบบแล้ว!" });

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "ไม่สามารถเชื่อมต่อระบบตรวจสอบสลิปได้" },
            { status: 500 }
        );
    }
}
