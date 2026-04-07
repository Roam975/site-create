import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Navbar } from "@/components/blocks/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create | B2B AI Automation & CRM Infrastructure",
  description: "Portal premium para aceleração de conversão B2B. SDR via WhatsApp e automação avançada de infraestruturas CRM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[var(--color-b2b-red)] selection:text-[var(--color-b2b-acid)] min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--color-b2b-red)] focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:uppercase focus:text-sm"
        >
          Pular para o conteúdo
        </a>
        <NoiseOverlay />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
