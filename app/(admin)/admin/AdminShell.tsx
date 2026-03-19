"use client";

import { useState, createContext, useContext } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";

const SidebarCtx = createContext<{
    collapsed: boolean;
    toggle: () => void;
}>({ collapsed: false, toggle: () => { } });

export function useSidebar() { return useContext(SidebarCtx); }

interface AdminShellProps {
    children: React.ReactNode;
    email: string;
    role: string;
}

export default function AdminShell({ children, email, role }: AdminShellProps) {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarW = collapsed ? 64 : 256;

    return (
        <SidebarCtx.Provider value={{ collapsed, toggle: () => setCollapsed(c => !c) }}>
            <div className="admin-shell">
                {/* Sidebar */}
                <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

                {/* Main */}
                <div
                    className="admin-main"
                    style={{ marginLeft: sidebarW }}
                >
                    <AdminTopBar
                        email={email}
                        role={role}
                        onToggle={() => setCollapsed(c => !c)}
                        collapsed={collapsed}
                    />
                    <main className="admin-content">
                        {children}
                    </main>
                </div>

                <style>{`
                    .admin-shell {
                        display: flex;
                        min-height: 100vh;
                        background: var(--admin-bg);
                        color: var(--admin-text);
                    }
                    .admin-main {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        background: var(--admin-bg);
                        min-width: 0;
                        transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
                    }
                    .admin-content {
                        flex: 1;
                        padding: 28px 32px;
                        overflow-y: auto;
                    }
                    @media (max-width: 1023px) {
                        .admin-main { margin-left: 0 !important; }
                        .admin-content { padding: 16px; }
                    }
                `}</style>
            </div>
        </SidebarCtx.Provider>
    );
}
