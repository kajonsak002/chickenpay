"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export async function loginAction(prevState: any, formData: FormData) {
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

        // Set HttpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set("token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

    } catch (err: any) {
        return { error: err.message || "การเชื่อมต่อล้มเหลว" };
    }

    redirect("/profile");
}

export async function registerAction(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
        return { error: "รหัสผ่านไม่ตรงกัน" };
    }

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
            return { error: data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก" };
        }

        // Set HttpOnly cookie
        const cookieStore = await cookies();
        cookieStore.set("token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

    } catch (err: any) {
        return { error: err.message || "การเชื่อมต่อล้มเหลว" };
    }

    redirect("/profile");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}
