import Navbar from "@/app/components/ui/Navbar";
import Footer from "@/app/components/ui/Footer";
import { blogs } from "@/app/lib/blogs";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://chickenpay-dev.up.railway.app";

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
                <div className="mt-20 pt-12 border-t border-[var(--border-primary)] flex flex-col md:flex-row md:items-center justify-between gap-8">
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

                    <div className="flex items-center gap-4">
                        <span className="text-[var(--text-primary)] font-bold text-sm mr-2">Share:</span>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}/blog/${slug}`}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2]/20 transition-all border border-[#1877F2]/20"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a
                            href={`https://social-plugins.line.me/lineit/share?url=${BASE_URL}/blog/${slug}`}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[#06C755] hover:bg-[#06C755]/20 transition-all border border-[#06C755]/20"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 10.3c0-4.6-4.9-8.3-11-8.3S2 5.7 2 10.3c0 4.1 3.9 7.6 9.2 8.2.4 0 .8.2 1 .5l.2 1.3c.1.4 0 .7-.2 1l-1.1.9c-.2.2-.2.5 0 .7.1.1.2.2.4.2.1 0 .2 0 .3-.1l3.5-2.1c.3-.2.6-.2.9-.2 4.4-.3 8.1-3.6 8.1-7.8zM8 12.3c0 .2-.1.4-.3.6s-.4.3-.6.3h-1.5c-.2 0-.4-.1-.6-.3s-.3-.4-.3-.6v-3.7c0-.2.1-.4.3-.6s.4-.3.6-.3h1.5c.2 0 .4.1.6.3s.3.4.3.6v3.7zM11.5 13.2h-1.5c-.2 0-.4-.1-.6-.3s-.3-.4-.3-.6v-3.7c0-.2.1-.4.3-.6s.4-.3.6-.3h.1c.2 0 .4.1.6.3s.3.4.3.6v3.1c0 .2.1.4.3.6h.1c.2 0 .4.1.6.3s.3.4.3.6v.3c0 .3-.2.4-.4.4zM14.5 13.2h-.1c-.2 0-.4-.1-.6-.3s-.3-.4-.3-.6v-3.7c0-.2.1-.4.3-.6s.4-.3.6-.3h.1c.2 0 .4.1.6.3s.3.4.3.6v.3c0 .3-.2.4-.4.4h-.1zM19.1 13.2h-1.5c-.2 0-.4-.1-.6-.3s-.3-.4-.3-.6v-3.7c0-.2.1-.4.3-.6s.4-.3.6-.3h1.5c.2 0 .4.1.6.3s.3.4.3.6v.3c0 .3-.2.4-.4.4h-1.1v.7c0 .2.1.3.2.4s.2.2.4.2h.5c.2 0 .4.1.6.3s.3.4.3.6v.3c0 .3-.1.4-.4.4h-.5v.7c0 .2.1.3.2.4s.2.2.4.2h1.1c.2 0 .4.1.6.3s.3.4.3.6v.3c0 .3-.2.4-.4.4z" /></svg>
                        </a>
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

                {/* Related Articles */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">บทความที่คุณอาจสนใจ</h2>
                        <Link href="/blog" className="text-blue-400 text-sm font-bold hover:underline">ดูทั้งหมด</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {blogs.filter(b => b.slug !== slug).slice(0, 2).map(related => (
                            <Link
                                key={related.slug}
                                href={`/blog/${related.slug}`}
                                className="group block space-y-4"
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border-primary)]">
                                    <Image
                                        src={related.image}
                                        alt={related.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-[var(--text-primary)] font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {related.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
