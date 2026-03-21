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

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://chickenpay-dev.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  alternates: {
    canonical: "/",
  },

  title: {
    default: "ChickenPay - ซื้อแอปพรีเมียม ราคาถูก",
    template: "%s | ChickenPay",
  },

  description:
    "Netflix, Spotify, YouTube Premium ราคาถูก ปลอดภัย 100%",

  keywords: [
    "แอปพรีเมียม",
    "Netflix ราคาถูก",
    "Spotify พรีเมียม",
    "Youtube Premium ของแท้",
    "แอปแท้",
    "ซื้อแอปราคาถูก",
    "ChickenPay",
  ],

  openGraph: {
    title: "ChickenPay - ซื้อแอปพรีเมียม ราคาถูก",
    description:
      "Netflix, Spotify, YouTube Premium ราคาถูก ปลอดภัย 100%",
    url: BASE_URL,
    siteName: "ChickenPay Premium Apps",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/preview.jpg`,
        width: 1200,
        height: 630,
        alt: "ChickenPay - Premium Apps Marketplace",
      },
    ],
  },

  twitter: {
    title: "ChickenPay — ศูนย์รวมแอปพรีเมียมราคาถูก",
    description:
      "Netflix, Spotify, YouTube Premium ราคาถูก ปลอดภัย 100%",
    card: "summary_large_image",
    images: [`${BASE_URL}/preview.jpg`],
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

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },

  verification: {
    google: "otCDcvsnLkzfCIxCyErpkPCK81vbyakWRchcJu7iDZs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ChickenPay",
  "url": BASE_URL,
  "description": "แหล่งรวมแอปพลิเคชันพรีเมียมราคาประหยัด Netflix, Spotify, YouTube Premium พร้อมรับประกันการใช้งาน 100% ส่งมอบอัตโนมัติ 24 ชั่วโมง",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ChickenPay Premium Apps",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "sameAs": [
    "https://facebook.com/chickenpay", // Replace with real links if available
    "https://line.me/ti/p/@chickenpay"
  ]
};

import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/auth/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="th" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <ThemeProvider>
          <AuthProvider user={user}>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}