import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";
import { blogs } from "@/app/lib/blogs";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
    return blogs.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) return { title: "Blog Not Found" };

    return {
        title: `${blog.title} | ChickenPay Blog`,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: [blog.image],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) notFound();

    return (
        <main className="bg-[var(--bg-primary)] min-h-screen">
            <Navbar />

            <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-blue-400 text-xs font-bold mb-8 transition-all group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    กลับไปหน้าบทความ
                </Link>

                {/* Article Header */}
                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                            {blog.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-[1.15]">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[var(--text-secondary)] text-sm border-y border-[var(--border-primary)] py-6 mt-12">
                        <div className="flex items-center gap-2 font-medium">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <User size={16} />
                            </div>
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-500/60" />
                            {new Date(blog.date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-blue-500/60" />
                            ใช้เวลาอ่าน 5 นาที
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-[var(--border-primary)] shadow-2xl">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-p:leading-8 prose-p:mb-6 prose-strong:text-blue-400">
                    <div className="text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </div>
                </article>

                {/* Share/Tags Section */}
                <div className="mt-20 pt-12 border-t border-[var(--border-primary)]">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm mr-2">
                            <Tag size={16} className="text-blue-500" />
                            Tags:
                        </span>
                        {["Netflix", "Spotify", "Youtube", "ทริคประหยัดเงิน"].map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs hover:border-blue-500/50 cursor-pointer transition-all">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Visual Recommendation Section */}
                <div className="mt-24 p-10 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 mt-2">
                        ต้องการแอปพรีเมียมราคาประหยัด?
                    </h3>
                    <div className="flex gap-4">
                        <Link
                            href="/apps"
                            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20 hover:scale-105 hover:shadow-blue-500/40 transition-all active:scale-95"
                        >
                            ไปหน้าสั่งซื้อเลย
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
