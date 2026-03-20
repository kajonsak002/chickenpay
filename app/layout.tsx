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
  title: "ChickenPay — ศูนย์รวมแอปพรีเมียมราคาถูก",
  description: "แหล่งรวมแอปพลิเคชันพรีเมียมราคาประหยัด Netflix, Spotify, YouTube Premium และอีกมากมาย พร้อมรับประกันตลอดการใช้งาน",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
