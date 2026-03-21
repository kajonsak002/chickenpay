import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // กำหนดเพื่อซ่อนว่าเว็บใช้ Next.js แอบเป็นผลดีต่อ Security เล็กน้อย
    poweredByHeader: false,
    // ปิด Trailing Slash ป้องกันปัญหา Duplicate Content ใน SEO
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api-chickenpay.up.railway.app",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "gafiwshop.xyz",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
        ],
    },
};

export default nextConfig;
