import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair, Kaushan_Script } from "next/font/google";
import "./globals.css";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from "@/components/ui/sonner"


const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair({
  variable: "--font-serif",
  subsets: ["latin"],
});

const fontMono = Kaushan_Script({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "PPP Tawang",
  description: "Profile Web PPP Tawang",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
          <Theme>
              <Analytics />
              {children}
          </Theme>
          <Toaster />
      </body>
    </html>
  );
}
