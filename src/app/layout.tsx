import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuickViewWrapper from "@/components/product/QuickViewWrapper";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ausphotic — Light Up Your Wardrobe | Pre-loved Fashion Marketplace",
  description:
    "India's premium second-hand fashion marketplace. Buy pre-loved, verified clothing at up to 70% off retail. Sustainable style, zero compromise.",
  keywords: [
    "second hand clothes",
    "pre-loved fashion",
    "thrift store India",
    "sustainable fashion",
    "vintage clothing",
    "used clothes online",
  ],
  openGraph: {
    title: "Ausphotic — Light Up Your Wardrobe",
    description: "India's premium second-hand fashion marketplace",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} font-body min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuickViewWrapper />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
