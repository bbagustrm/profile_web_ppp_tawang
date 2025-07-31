'use client'

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter } from "@/components/ui/card";
import {ArrowCircleRight } from "phosphor-react";


export default function AboutSection() {
    return (
        <div className="container mx-auto py-16 px-8 lg:px-16 xl:px-24">
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 mb-12 md:mb-16">
                    <div className="w-1.5 h-20 bg-teal-500" />
                    <div className="flex flex-col justify-center gap-4">
                        <h6>ABOUT US</h6>
                        <h2>Lebih Kenal dengan Kami</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Profile", img: "/profile.jpg", link: "/about" },
                        { title: "Arsip Sejarah", img: "/galeri.png", link: "/galeri" },
                        { title: "UMKM", img: "/umkm.png", link: "/umkm" },
                    ].map((item, index) => (
                        <Card key={index} className="w-full shadow-sm rounded-xl overflow-hidden">
                            <div className="relative w-full h-40">
                                <Image
                                    src={item.img}
                                    alt={`Foto ${item.title}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardFooter className="flex justify-between items-center p-4">
                                <p className="text-sm font-medium text-[#163d4a]">{item.title}</p>
                                <Link href={item.link}>
                                    <ArrowCircleRight size={32} weight="fill" className="text-teal-600" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}