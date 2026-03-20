import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chickenpay.com'),
  title: {
    default: "ChickenPay — ศูนย์รวมแอปพรีเมียมและบัญชีราคาถูก อันดับ 1",
    template: "%s | ChickenPay",
  },
  description: "แหล่งรวมแอปพลิเคชันพรีเมียมราคาประหยัด Netflix, Spotify, YouTube Premium พร้อมรับประกันการใช้งาน 100% ส่งมอบอัตโนมัติ 24 ชั่วโมง ของแท้ราคาถูกที่สุด",
  keywords: ["แอปพรีเมียม", "Netflix ราคาถูก", "Spotify พรีเมียม", "Youtube Premium ของแท้", "แอปแท้", "ซื้อแอปราคาถูก", "ChickenPay"],
  openGraph: {
    title: "ChickenPay — ศูนย์รวมแอปพรีเมียมและบัญชีราคาถูก",
    description: "แพลตฟอร์มจำหน่ายบัญชีสตรีมมิ่งพรีเมียมของแท้ ถูกที่สุด พร้อมรับประกัน 100% จัดส่งทันที",
    url: "https://chickenpay.com",
    siteName: "ChickenPay Premium Apps",
    locale: "th_TH",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "ChickenPay — ศูนย์รวมแอปพรีเมียมราคาถูก",
    card: "summary_large_image",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "I8-c7XyyB-kCcnM7wzXvl4lOFFtvque0GKaxGdrAkDo",
  },
};

import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store'
      });
      if (res.ok) return await res.json();
      return null;
  } catch {
      return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="th" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider user={user}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
