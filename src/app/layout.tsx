import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google"; // Ganti Lato ke Plus Jakarta Sans
import "./globals.css";
import { siteConfig } from "@/config/site";

// --- 1. SETUP FONTS ---
// Serif: Untuk Judul (Kesan Klasik/Mahal)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Sans: Untuk Body Text (Modern & Bersih - Upgrade dari Lato)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// --- 2. DYNAMIC METADATA (SEO) ---
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // Hasil: "Menu | Heritage Dining"
  },
  description: siteConfig.description,
  keywords: [
    "Fine Dining",
    "Restaurant",
    "Reservation",
    "Culinary",
    "Gastronomy",
    siteConfig.name,
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.jpg", // Menggunakan relative path jika siteConfig.url kosong/undefined
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // Manifest opsional, uncomment jika file ada
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

// --- 3. VIEWPORT SETTINGS ---
export const viewport: Viewport = {
  themeColor: "#1a1815", // Warna primary/dark
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// --- 4. ROOT LAYOUT ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased bg-stone-50 text-stone-900 selection:bg-orange-200 selection:text-orange-900`}
      >
        {/* Main Wrapper */}
        <main className="min-h-screen flex flex-col font-sans">
            {children}
        </main>
      </body>
    </html>
  );
}