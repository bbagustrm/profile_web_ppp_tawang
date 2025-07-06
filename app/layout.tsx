import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair, Kaushan_Script } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { Theme } from "@radix-ui/themes";

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
              <Navbar/>
              {children}
          </Theme>
      </body>
    </html>
  );
}
