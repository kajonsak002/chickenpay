"use client";

interface AdminTopBarProps {
    email: string;
    role: string;
    onToggle: () => void;
    collapsed: boolean;
}

export default function AdminTopBar({ email, role, onToggle, collapsed }: AdminTopBarProps) {
    const initials = email ? email.slice(0, 2).toUpperCase() : "AD";
    const roleLabel = role === "SUPER_ADMIN" ? "Super Admin" : "Admin";
    const roleBadgeClass = role === "SUPER_ADMIN" ? "badge-superadmin" : "badge-admin";

    return (
        <>
            <header className="admin-topbar">
                {/* Left: mobile/tablet hamburger + label */}
                <div className="topbar-left">
                    {/* Hamburger visible only on mobile (sidebar hidden) */}
                    <button
                        className="topbar-hamburger"
                        onClick={onToggle}
                        title={collapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"}
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="topbar-live">
                        <span className="topbar-live-dot" />
                        <span className="topbar-live-text">Live Dashboard</span>
                    </div>
                </div>

                {/* Right: profile */}
                <div className="topbar-right">
                    <div className={`role-badge ${roleBadgeClass}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="role-label-text">{roleLabel}</span>
                    </div>
                    <div className="topbar-profile">
                        <div className="profile-avatar">{initials}</div>
                        <p className="profile-email">{email}</p>
                    </div>
                </div>
            </header>

            <style>{`
                .admin-topbar {
                    height: 64px;
                    background: rgba(14,14,28,0.85);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--admin-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 24px;
                    position: sticky;
                    top: 0;
                    z-index: 40;
                    gap: 12px;
                }
                .topbar-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .topbar-hamburger {
                    display: flex; align-items: center; justify-content: center;
                    width: 36px; height: 36px;
                    border-radius: 9px;
                    border: 1px solid rgba(139,92,246,0.18);
                    background: rgba(124,58,237,0.07);
                    color: #a78bfa;
                    cursor: pointer;
                    transition: all 0.18s ease;
                    flex-shrink: 0;
                }
                .topbar-hamburger:hover {
                    background: rgba(124,58,237,0.16);
                    border-color: rgba(124,58,237,0.35);
                }
                .topbar-live {
                    display: flex; align-items: center; gap: 7px;
                }
                .topbar-live-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px #22c55e;
                    animation: live-pulse 2s infinite;
                    flex-shrink: 0;
                }
                @keyframes live-pulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 8px #22c55e; }
                    50% { opacity: 0.55; box-shadow: 0 0 16px #22c55e; }
                }
                .topbar-live-text {
                    font-size: 12px; font-weight: 600;
                    color: #64748b; letter-spacing: 0.04em;
                }
                .topbar-right {
                    display: flex; align-items: center; gap: 12px;
                }
                .role-badge {
                    display: flex; align-items: center; gap: 5px;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 11px; font-weight: 700;
                    letter-spacing: 0.04em;
                    white-space: nowrap;
                }
                .badge-superadmin {
                    background: rgba(124,58,237,0.14);
                    color: #a78bfa;
                    border: 1px solid rgba(124,58,237,0.25);
                }
                .badge-admin {
                    background: rgba(59,130,246,0.11);
                    color: #7dd3fc;
                    border: 1px solid rgba(59,130,246,0.2);
                }
                .topbar-profile {
                    display: flex; align-items: center; gap: 9px;
                    padding: 5px 11px 5px 5px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                }
                .profile-avatar {
                    width: 30px; height: 30px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #7c3aed, #4f46e5);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 11px; font-weight: 800;
                    color: white; flex-shrink: 0;
                }
                .profile-email {
                    font-size: 12px; color: #94a3b8;
                    max-width: 160px;
                    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                }
                @media (max-width: 640px) {
                    .role-label-text { display: none; }
                    .topbar-live-text { display: none; }
                    .profile-email { display: none; }
                    .topbar-profile { padding: 5px; }
                    .admin-topbar { padding: 0 14px; }
                }
            `}</style>
        </>
    );
}
