import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CBD Premium Boutique - Votre boutique de confiance",
  description: "Découvrez notre sélection de produits CBD de qualité premium. Huiles, fleurs, gélules et crèmes pour votre bien-être quotidien.",
  keywords: "CBD, chanvre, bien-être, huile CBD, fleurs CBD, gélules CBD, crème CBD",
  authors: [{ name: "CBD Premium Boutique" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "CBD Premium Boutique",
    description: "Votre boutique de confiance pour des produits CBD de qualité premium",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
