"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === 1
                        ? "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-orange-500 hover:border-orange-500/50 hover:shadow-lg shadow-orange-500/10"
                }`}
                aria-label="หน้าแรก"
            >
                <ChevronsLeft size={18} />
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === 1
                        ? "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-orange-500 hover:border-orange-500/50 hover:shadow-lg shadow-orange-500/10"
                }`}
                aria-label="หน้าก่อนหน้า"
            >
                <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5 hidden sm:flex">
                {startPage > 1 && (
                    <>
                        <button onClick={() => onPageChange(1)} className="w-10 h-10 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-orange-500/50 hover:text-orange-500 font-medium transition-all text-sm">
                            1
                        </button>
                        {startPage > 2 && <span className="text-[var(--text-secondary)]">...</span>}
                    </>
                )}

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-medium font-mono text-sm transition-all shadow-md ${
                            currentPage === number
                                ? "bg-gradient-to-br from-orange-500 to-orange-600 border-none text-white shadow-orange-500/30 scale-105"
                                : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-orange-500/50 hover:text-orange-500 hover:shadow-orange-500/10"
                        }`}
                    >
                        {number}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-[var(--text-secondary)]">...</span>}
                        <button onClick={() => onPageChange(totalPages)} className="w-10 h-10 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-orange-500/50 hover:text-orange-500 font-medium transition-all text-sm">
                            {totalPages}
                        </button>
                    </>
                )}
            </div>
            
            <div className="flex sm:hidden items-center justify-center px-4 py-2 border border-[var(--border-primary)] rounded-xl bg-[var(--bg-secondary)] text-sm font-medium text-[var(--text-primary)]">
                {currentPage} / {totalPages}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === totalPages
                        ? "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-orange-500 hover:border-orange-500/50 hover:shadow-lg shadow-orange-500/10"
                }`}
                aria-label="หน้าถัดไป"
            >
                <ChevronRight size={18} />
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === totalPages
                        ? "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-gray-500 cursor-not-allowed opacity-50"
                        : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-orange-500 hover:border-orange-500/50 hover:shadow-lg shadow-orange-500/10"
                }`}
                aria-label="หน้าสุดท้าย"
            >
                <ChevronsRight size={18} />
            </button>
        </div>
    );
}
