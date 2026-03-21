"use client";

import { useState } from "react";
import Breadcrumb from "../components/ui/Breadcrumb";
import Swal from "sweetalert2";
import { MessageCircle, Facebook, Mail, Loader2, Send } from "lucide-react";

export default function ContactClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock submission
        setTimeout(() => {
            setIsSubmitting(false);
            Swal.fire({
                icon: 'success',
                title: 'ส่งข้อความสำเร็จ!',
                text: 'เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด',
                background: '#1e1e2d',
                color: '#fff',
                confirmButtonColor: '#f97316',
                customClass: { popup: 'rounded-2xl border border-white/10' }
            });
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    const contactMethods = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            label: "Line Official",
            value: "@chickenpay",
            href: "#",
            color: "from-green-500 to-green-600",
            shadow: "shadow-green-500/20"
        },
        {
            icon: <Facebook className="w-6 h-6" />,
            label: "Facebook Page",
            value: "ChickenPay - แอปพรีเมียมราคาถูก",
            href: "#",
            color: "from-blue-500 to-blue-600",
            shadow: "shadow-blue-500/20"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email Support",
            value: "support@chickenpay.com",
            href: "mailto:support@chickenpay.com",
            color: "from-orange-500 to-orange-600",
            shadow: "shadow-orange-500/20"
        }
    ];

    return (
        <div className="flex-1 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
                <Breadcrumb />
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        ติดต่อเรา | Contact Us
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
                        ยินดีให้คำปรึกษา <span className="text-orange-500">24 ชั่วโมง</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                        หากคุณมีปัญหาการใช้งาน พบข้อบกพร่อง หรือต้องการสอบถามข้อมูลเพิ่มเติมเกี่ยวกับแอปพรีเมียม ทีมงานของเราพร้อมดูแลคุณเสมอ
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                            ช่องทางติดต่อหลัก
                        </h2>

                        {contactMethods.map((method, idx) => (
                            <a
                                key={idx}
                                href={method.href}
                                className="group block p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white shadow-lg ${method.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-0.5">{method.label}</p>
                                        <p className="text-[var(--text-primary)] font-bold text-sm sm:text-base group-hover:text-orange-400 transition-colors">{method.value}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all">
                                        <svg className="w-4 h-4 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}

                        {/* Status Card */}
                        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#1e1e2d] to-[#161625] border border-orange-500/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-green-500 text-xs font-bold mb-3 uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Online Support
                                </div>
                                <h3 className="text-white font-bold mb-2">เจ้าหน้าที่กำลังออนไลน์</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                    ทีมงานพร้อมตอบกลับปลาภายใน <span className="text-[var(--text-primary)] font-bold">5-10 นาที</span> ในเวลาทำการ (09:00 - 24:00 น.)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="p-1 rounded-3xl bg-gradient-to-br from-[var(--border-primary)] via-orange-500/10 to-[var(--border-primary)]">
                            <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                                    ส่งข้อความหาเรา
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">ชื่อของคุณ</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="สมชาย ไก่เพลย์"
                                                className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">อีเมลติดต่อ</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="somchai@example.com"
                                                className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">หัวเรื่อง</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500/50 transition-all outline-none appearance-none">
                                            <option>สอบถามข้อมูลทั่วไป</option>
                                            <option>พบปัญหาการชำระเงิน</option>
                                            <option>แจ้งปัญหาการใช้งานแอป</option>
                                            <option>ขอเคลมสินค้า / ประกัน</option>
                                            <option>อื่นๆ</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">รายละเอียด</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="พิมพ์ข้อความที่คุณต้องการติดต่อเราที่นี่..."
                                            className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-2xl text-white font-bold text-base shadow-xl transition-all relative overflow-hidden group
                                            ${isSubmitting
                                                ? "bg-orange-800 cursor-not-allowed opacity-70"
                                                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-95"}`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                                                    กำลังส่งข้อความ...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    ส่งข้อความหาทีมงาน
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
