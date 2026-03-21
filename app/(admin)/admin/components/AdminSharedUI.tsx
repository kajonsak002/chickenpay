"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export function AdminTableControls({
    searchQuery,
    setSearchQuery,
    itemsPerPage,
    setItemsPerPage,
    placeholder = "ค้นหา...",
}: {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    itemsPerPage: number;
    setItemsPerPage: (val: number) => void;
    placeholder?: string;
}) {
    return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-input"
                    style={{ paddingLeft: "36px", width: "250px" }}
                />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", color: "#888" }}>แสดง:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="admin-input"
                    style={{ appearance: "auto", paddingRight: "20px" }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    );
}

export function AdminPaginationFooter({
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
}: {
    currentPage: number;
    setCurrentPage: (val: number | ((prev: number) => number)) => void;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: "14px", color: "#888" }}>
                แสดง {startItem} ถึง {endItem} จากทั้งหมด {totalItems} รายการ
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                    style={{ padding: "6px" }}
                >
                    <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${currentPage === page ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "4px 12px", minWidth: "32px" }}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary"
                    style={{ padding: "6px" }}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
