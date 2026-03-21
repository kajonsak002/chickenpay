"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
    const pathname = usePathname();

    // Default items based on pathname if not provided
    const defaultItems: BreadcrumbItem[] = [
        { label: "หน้าแรก", href: "/" },
    ];

    if (!items) {
        const paths = pathname.split("/").filter(Boolean);
        paths.forEach((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            let label = path.charAt(0).toUpperCase() + path.slice(1);

            // Map common paths to Thai
            if (path === "apps") label = "แอปพรีเมียม";
            if (path === "profile") label = "บัญชีของฉัน";
            if (path === "topup") label = "เติมเงิน";
            if (path === "contact") label = "ติดต่อเรา";
            if (path === "product") label = "สินค้า";
            if (path === "login") label = "เข้าสู่ระบบ";
            if (path === "register") label = "สมัครสมาชิก";

            // For dynamic [category] we might need better decoding, handled in props
            if (path.includes("%")) label = decodeURIComponent(path);

            defaultItems.push({ label, href });
        });
    }

    const displayItems = items || defaultItems;

    return (
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)] mb-6 animate-fade-in overflow-x-auto no-scrollbar whitespace-nowrap py-1">
            {displayItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight size={14} className="text-[var(--text-muted)] opacity-50 flex-shrink-0" />}

                    {item.href && index < displayItems.length - 1 ? (
                        <Link
                            href={item.href}
                            className="hover:text-orange-500 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-[var(--text-primary)] font-bold truncate">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
