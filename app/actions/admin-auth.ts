"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export async function adminLoginAction(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
            return { error: data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        }

        // Decode role from JWT (simple base64 decode of payload)
        const parts = data.access_token.split('.');
        if (parts.length !== 3) return { error: "Token ไม่ถูกต้อง" };
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
            return { error: "คุณไม่มีสิทธิ์เข้าถึงระบบแอดมิน" };
        }

        const cookieStore = await cookies();
        cookieStore.set("token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        });

    } catch (err: any) {
        return { error: err.message || "การเชื่อมต่อล้มเหลว" };
    }

    redirect("/admin");
}

export async function adminLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/admin-login");
}
