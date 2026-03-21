import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";
import BlogCard from "@/app/components/ui/BlogCard";
import { blogs } from "@/app/lib/blogs";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "บทความและรีวิวสตรีมมิ่งที่น่าสนใจ | ChickenPay",
    description: "รวมบทความ วิธีการซื้อ Netflix ราคาถูก รีวิวแอปพรีเมียม และเทคนิคการใช้งานสตรีมมิ่งต่างๆ ให้คุ้มค่าที่สุด",
    keywords: ["รีวิวแอปพรีเมียม", "วิธีซื้อ Netflix", "YouTube Premium ราคาถูก", "Spotify Family", "ChickenPay Blog"],
};

export default function BlogPage() {
    return (
        <main className="bg-[var(--bg-primary)] min-h-screen pb-20">
            <Navbar />

            {/* Header Section */}
            <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <BookOpen size={14} />
                        Blog & Articles
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4 drop-shadow-sm">
                        บทความและ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">รีวิวที่น่าสนใจ</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl leading-relaxed">
                        แหล่งรวบรวมเทคนิค วิธีการใช้งาน และรีวิวสตรีมมิ่งยอดนิยมระดับโลก เพื่อให้คุณได้รับความบันเทิงอย่างคุ้มค่าที่สุดในราคาประหยัด
                    </p>
                </div>

                {/* Categories - Simple filter placeholder */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {["ทั้งหมด", "ความรู้", "สตรีมมิ่ง", "ดนตรี", "ทริคการใช้งาน"].map(cat => (
                        <button
                            key={cat}
                            className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${cat === "ทั้งหมด"
                                ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                : "bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-blue-500/50 hover:text-blue-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))}
                </div>

                {/* Visual Accent */}
                <div className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-[#1E1E36] to-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                        มีเรื่องราวอยากแชร์หรือสอบถาม?
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm max-w-lg mb-8 leading-relaxed">
                        แอดไลน์พูดคุยกับทีมงานของเราได้ตลอด 24 ชั่วโมง หรือเสนอแนะบทความที่คุณต้องการอ่านได้เลย!
                    </p>
                    <a
                        href="https://line.me/ti/p/@chickenpay"
                        target="_blank"
                        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20 hover:scale-105 hover:shadow-blue-500/40 transition-all active:scale-95"
                    >
                        ติดต่อสอบถามได้ที่นี่
                    </a>
                </div>
            </div>

            <Footer />
        </main>
    );
}
