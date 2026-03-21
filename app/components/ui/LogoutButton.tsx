"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { logoutAction } from "../../actions/auth";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'ยืนยันการออกจากระบบ?',
            text: "คุณต้องการออกจากระบบใช่หรือไม่?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#374151',
            confirmButtonText: 'ใช่, ออกจากระบบ',
            cancelButtonText: 'ยกเลิก',
            background: '#1e1e2d',
            color: '#fff',
            customClass: { popup: 'rounded-2xl border border-white/10' }
        });

        if (isConfirmed) {
            await logoutAction(); // This is a server action, it will clear cookies and redirect if handled in action, or we handle here
            // If action doesn't redirect, we do:
            router.push("/login");
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
        >
            <LogOut size={16} />
            ออกจากระบบ
        </button>
    );
}
