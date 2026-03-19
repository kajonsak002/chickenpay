"use client";

import { usePathname } from "next/navigation";
import { adminLogoutAction } from "../../actions/admin-auth";

interface NavItem {
    href: string;
    label: string;
    exact?: boolean;
    icon: React.ReactNode;
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

const navGroups: NavGroup[] = [
    {
        label: "ภาพรวม",
        items: [
            {
                href: "/admin",
                label: "Dashboard",
                exact: true,
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                ),
            },
        ],
    },
    {
        label: "จัดการข้อมูล",
        items: [
            {
                href: "/admin/users",
                label: "ผู้ใช้งาน",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                ),
            },
            {
                href: "/admin/products",
                label: "สินค้า",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                ),
            },
            {
                href: "/admin/orders",
                label: "ออเดอร์",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                ),
            },
        ],
    },
    {
        label: "การเงิน",
        items: [
            {
                href: "/admin/topups",
                label: "เติมเงิน",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                ),
            },
            {
                href: "/admin/transactions",
                label: "ธุรกรรม",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
            },
        ],
    },
];

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();
    const w = collapsed ? 64 : 256;

    return (
        <>
            <aside
                className="admin-sidebar"
                style={{ width: w }}
                aria-label="Admin Navigation"
            >
                {/* Logo + Toggle */}
                <div className="sb-logo" style={{ justifyContent: collapsed ? "center" : "space-between" }}>
                    {!collapsed && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div className="sb-logo-icon">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="sb-logo-title">ChickenPay</p>
                                <p className="sb-logo-sub">Admin Console</p>
                            </div>
                        </div>
                    )}
                    {/* <button
                        onClick={onToggle}
                        className="sb-toggle-btn"
                        title={collapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"}
                        aria-label="Toggle sidebar"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ transition: "transform 0.3s ease", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button> */}
                </div>

                {/* Nav */}
                <nav className="sb-nav">
                    {navGroups.map((group) => (
                        <div key={group.label} className="sb-group">
                            {!collapsed && (
                                <p className="sb-group-label">{group.label}</p>
                            )}
                            {group.items.map((item) => {
                                const isActive = item.exact
                                    ? pathname === item.href
                                    : pathname.startsWith(item.href);
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className={`sb-item${isActive ? " sb-item--active" : ""}`}
                                        style={{ justifyContent: collapsed ? "center" : "flex-start" }}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <span className="sb-item-icon">{item.icon}</span>
                                        {!collapsed && (
                                            <span className="sb-item-label">{item.label}</span>
                                        )}
                                        {isActive && !collapsed && <span className="sb-item-dot" />}
                                    </a>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="sb-footer">
                    <form action={adminLogoutAction}>
                        <button
                            type="submit"
                            className="sb-logout-btn"
                            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
                            title={collapsed ? "ออกจากระบบ" : undefined}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {!collapsed && <span>ออกจากระบบ</span>}
                        </button>
                    </form>
                </div>
            </aside>

            <style>{`
                .admin-sidebar {
                    position: fixed;
                    top: 0; left: 0; bottom: 0;
                    background: var(--admin-surface);
                    border-right: 1px solid var(--admin-border);
                    display: flex;
                    flex-direction: column;
                    z-index: 50;
                    overflow: hidden;
                    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .admin-sidebar::before {
                    content: "";
                    position: absolute;
                    top: -100px; left: -60px;
                    width: 260px; height: 260px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Logo row */
                .sb-logo {
                    display: flex;
                    align-items: center;
                    padding: 18px 14px;
                    border-bottom: 1px solid var(--admin-border);
                    min-height: 64px;
                    gap: 8px;
                }
                .sb-logo-icon {
                    width: 34px; height: 34px;
                    border-radius: 9px;
                    background: linear-gradient(135deg, #7c3aed, #4f46e5);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 0 16px rgba(124,58,237,0.4);
                    flex-shrink: 0;
                    color: white;
                }
                .sb-logo-title {
                    font-weight: 700; font-size: 14px;
                    color: #e2e8f0; line-height: 1.2;
                }
                .sb-logo-sub {
                    font-size: 9px; color: #a78bfa;
                    font-weight: 600; letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                /* Toggle button */
                .sb-toggle-btn {
                    display: flex; align-items: center; justify-content: center;
                    width: 30px; height: 30px;
                    border-radius: 8px;
                    border: 1px solid rgba(139,92,246,0.2);
                    background: rgba(124,58,237,0.08);
                    color: #a78bfa;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: all 0.18s ease;
                }
                .sb-toggle-btn:hover {
                    background: rgba(124,58,237,0.18);
                    border-color: rgba(124,58,237,0.4);
                }

                /* Nav */
                .sb-nav {
                    flex: 1; padding: 12px 8px;
                    overflow-y: auto; overflow-x: hidden;
                    scrollbar-width: none;
                }
                .sb-nav::-webkit-scrollbar { display: none; }
                .sb-group { margin-bottom: 20px; }
                .sb-group-label {
                    font-size: 9px; font-weight: 700;
                    letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--admin-text-muted);
                    padding: 0 8px 6px; white-space: nowrap;
                }

                /* Nav items */
                .sb-item {
                    display: flex; align-items: center; gap: 10px;
                    padding: 9px 10px;
                    border-radius: 10px;
                    margin-bottom: 2px;
                    font-size: 13.5px; font-weight: 500;
                    color: var(--admin-text-dim);
                    text-decoration: none;
                    position: relative;
                    transition: all 0.18s ease;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .sb-item:hover {
                    background: rgba(124,58,237,0.08);
                    color: #c4b5fd;
                }
                .sb-item--active {
                    background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(79,70,229,0.1));
                    color: #a78bfa; font-weight: 600;
                    border: 1px solid rgba(124,58,237,0.2);
                }
                .sb-item-icon {
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; opacity: 0.75;
                }
                .sb-item--active .sb-item-icon { opacity: 1; }
                .sb-item-label { flex: 1; }
                .sb-item-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #a78bfa;
                    box-shadow: 0 0 6px #7c3aed;
                    flex-shrink: 0;
                }

                /* Footer / Logout */
                .sb-footer {
                    padding: 12px 8px;
                    border-top: 1px solid var(--admin-border);
                }
                .sb-logout-btn {
                    display: flex; align-items: center; gap: 10px;
                    width: 100%;
                    padding: 9px 10px;
                    border-radius: 10px;
                    border: 1px solid transparent;
                    background: transparent;
                    font-size: 13.5px; font-weight: 500;
                    color: #ef4444;
                    cursor: pointer;
                    transition: all 0.18s ease;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .sb-logout-btn:hover {
                    background: rgba(239,68,68,0.1);
                    border-color: rgba(239,68,68,0.2);
                }

                @media (max-width: 1023px) {
                    .admin-sidebar { display: none; }
                }
            `}</style>
        </>
    );
}
