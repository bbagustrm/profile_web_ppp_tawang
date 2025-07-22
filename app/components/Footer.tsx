'use client'

import Image from "next/image";
import Link from "next/link";
import {MapPin, Phone} from "phosphor-react";


export default function Footer() {
    return (
        <footer className="bg-[#163d4a] text-white">
            <div className="container mx-auto px-8 lg:px-16 xl:px-24">
                {/* Main Footer Content */}
                <div className="py-12 flex flex-col gap-12 md:flex-row md:justify-between lg:flex-nowrap md:gap-8">
                    {/* Logo and Address Section */}
                    <div className="w-full md:w-[calc(50%-1rem)] lg:w-[30%] flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <h3 className="text-2xl">PPP Tawang</h3>
                        </div>
                        <div className="space-y-4 text-variant">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 shrink-0" size={20} weight='fill' />
                                <p>Gempolsewu, Rowosari, Kec. Kendal, Jawa Tengah 51354</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} weight='fill'/>
                                <p>(0294)3645668</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} weight='fill'/>
                                <p>(0294)3645669</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section - Hidden on mobile and md */}
                    <div className="hidden lg:flex w-[20%] flex-col gap-6">
                        <h4 className="text-xl">Jelajahi</h4>
                        <div className="flex flex-col gap-4 text-variant">
                            <Link href="/layanan" className="hover:text-white transition-colors">
                                <p>Layanan Kami</p>
                            </Link>
                            <Link href="/news" className="hover:text-white transition-colors">
                                <p>Berita Terbaru</p>
                            </Link>
                            <Link href="/sejarah" className="hover:text-white transition-colors">
                                <p>Arsip Sejarah</p>
                            </Link>
                            <Link href="/umkm" className="hover:text-white transition-colors">
                                <p>UMKM</p>
                            </Link>
                        </div>
                    </div>

                    {/* About Section - Hidden on mobile and md */}
                    <div className="hidden lg:flex w-[20%] flex-col gap-6">
                        <h4 className="text-xl">About</h4>
                        <div className="flex flex-col gap-4 text-variant">
                            <Link href="/about" className="hover:text-white transition-colors">
                                <p>Lokasi</p>
                            </Link>
                            <Link href="/about" className="hover:text-white transition-colors">
                                <p>Visi dan Misi</p>
                            </Link>
                            <Link href="/about" className="hover:text-white transition-colors">
                                <p>Tugas Pokok</p>
                            </Link>
                            <Link href="/about" className="hover:text-white transition-colors">
                                <p>Fungsi</p>
                            </Link>
                            <Link href="/about" className="hover:text-white transition-colors">
                                <p>Fasilitas</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="py-6 border-t border-white/10 text-center md:text-left">
                    <p className="text-sm text-variant">
                        © 2025 PPP Tawang. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}