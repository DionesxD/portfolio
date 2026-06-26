import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johnny Alejandro — SOC & Cyber Operations",
  description:
    "Portfolio profissional de Johnny Alejandro. 7+ anos de experiência em TI, Cyber Operations, Infraestrutura e Desenvolvimento.",
  keywords: [
    "portfolio",
    "cybersecurity",
    "SOC",
    "infraestrutura",
    "TI",
    "Johnny Alejandro",
  ],
  authors: [{ name: "Johnny Alejandro" }],
  openGraph: {
    title: "Johnny Alejandro — SOC & Cyber Operations",
    description:
      "Portfolio profissional. 7+ anos em SOC, Cyber Operations, Infraestrutura e Dev.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnny Alejandro — SOC & Cyber Operations",
    description:
      "Portfolio profissional. 6+ anos em SOC, Cyber Operations, Infraestrutura e Dev.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0710] text-white selection:bg-[#b97aff]/30`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}