import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/lib/blogs";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Link 
            href={`/blog/${blog.slug}`}
            className="group flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
        >
            <div className="relative aspect-video overflow-hidden">
                <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        {blog.category}
                    </span>
                </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3 text-[var(--text-secondary)] text-[10px]">
                    <span className="flex items-center gap-1.5 font-medium">
                        <Calendar size={12} className="text-blue-400" />
                        {new Date(blog.date).toLocaleDateString('th-TH', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                        <User size={12} className="text-blue-400" />
                        {blog.author}
                    </span>
                </div>
                
                <h3 className="text-[var(--text-primary)] font-bold text-base mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] text-xs line-clamp-3 mb-5 leading-relaxed">
                    {blog.description}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-blue-400 text-xs font-bold group-hover:gap-3 transition-all">
                    อ่านเพิ่มเติม
                    <ArrowRight size={14} />
                </div>
            </div>
        </Link>
    );
}
