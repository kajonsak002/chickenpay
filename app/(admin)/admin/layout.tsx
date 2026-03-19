import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import AdminShell from "./AdminShell";
import "./admin.css";

interface JwtPayload { sub: string; email: string; role: string; }

export const metadata = {
    title: "Admin Panel — ChickenPay",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/admin-login");

    let userEmail = "";
    let userRole = "";
    try {
        const p = jwtDecode<JwtPayload>(token);
        if (p.role !== "ADMIN" && p.role !== "SUPER_ADMIN") redirect("/admin-login");
        userEmail = p.email;
        userRole = p.role;
    } catch {
        redirect("/admin-login");
    }

    return (
        <>
            <style>{`
                :root {
                    --admin-bg: #080812;
                    --admin-surface: #0e0e1c;
                    --admin-surface-2: #13132a;
                    --admin-border: rgba(139,92,246,0.12);
                    --admin-accent: #7c3aed;
                    --admin-accent-light: #a78bfa;
                    --admin-text: #e2e8f0;
                    --admin-text-muted: #64748b;
                    --admin-text-dim: #94a3b8;
                }
                * { box-sizing: border-box; }
                body { background: var(--admin-bg); }
            `}</style>

            <AdminShell email={userEmail} role={userRole}>
                {children}
            </AdminShell>
        </>
    );
}
