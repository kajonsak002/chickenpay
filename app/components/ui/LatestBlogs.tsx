import Link from "next/link";
import { blogs } from "@/app/lib/blogs";
import BlogCard from "./BlogCard";
import { ArrowRight } from "lucide-react";

export default function LatestBlogs() {
    // Show only the 3 latest blogs
    const latestBlogs = blogs.slice(0, 3);
    
    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-[var(--text-primary)] text-lg sm:text-xl font-bold flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-orange-500 rounded-full hidden sm:block"></span>
                        บทความล่าสุด
                    </h2>
                    <Link href="/blog" className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-medium hover:text-[var(--text-primary)] hover:bg-orange-500/20 transition-all cursor-pointer">
                        ดูบทความทั้งหมด
                    </Link>
                </div>
                <Link 
                    href="/blog" 
                    className="hidden sm:flex items-center gap-2 text-blue-400 text-xs font-bold hover:gap-3 transition-all"
                >
                    ไปที่หน้า Blog
                    <ArrowRight size={14} />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestBlogs.map(blog => (
                    <BlogCard key={blog.slug} blog={blog} />
                ))}
            </div>
        </section>
    );
}
