'use client'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";
import { MapPin, Cube } from "phosphor-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/hero.png"
                alt="Hero Image"
                fill
                priority
                className="object-cover brightness-75"
            />
            <div className="absolute inset-0 flex justify-between items-center px-8 md:px-20 lg:px-32 space-y-4">
                <div className="flex flex-col space-y-4 text-white">
                    <div className="space-x-2 flex items-center ">
                        <MapPin size={28} weight="fill" />
                        <h5>Kab. Kendal</h5>
                    </div>
                    <div className="explore ">Explore</div>
                    <h1 className="">PPP Tawang</h1>
                    <span className="space-y-3 md:space-y-5"></span>
                    <div className="flex gap-4">
                        <Link href="#DenahSection">
                            <Button className={`text-primary bg-white hover:text-white`}>
                                Explore Now
                                <ArrowRight size={20} className="md:w-6 md:h-6"/>
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant='outline' className="bg-transparent ">
                                About Us
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <HoverCard>
                        <HoverCardTrigger>
                            <div className="bg-white size-10 rounded-full p-2 shadow-md cursor-pointer">
                                <Cube size={24} weight="fill" />
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" sideOffset={24} className="space-y-4">
                            <h5>Model Design 3D</h5>
                            <p>Program KKN Pembuatan Design Koridor untuk PPP Tawang</p>
                            <Link href='/'>
                                <Button variant='outline' className='mt-4'>
                                    Jelajahi Program
                                    <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                </Button>
                            </Link>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard>
                        <HoverCardTrigger>
                            <div className="bg-white size-10 rounded-full p-2 shadow-md cursor-pointer">
                                <MapPin size={24} weight="fill" />
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" sideOffset={24} className="space-y-4">
                            <h5>Kantor PPP Tawang</h5>
                            <p>Komplek TPI Tawang, Gempolsewu, Kec. Rowosari, Kab. kendal</p>
                            <Link href="https://maps.app.goo.gl/cjyPGziqbkpnWuzr7">
                                <Button variant='outline' className='mt-4'>
                                    Lihat di Google Maps
                                    <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                </Button>
                            </Link>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    );
}