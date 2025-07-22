'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
            <div className="absolute inset-0 flex flex-col justify-between">
                <div className="h-full flex flex-row gap-8 md:gap-0 justify-between items-center px-8 md:px-20 lg:px-32 space-y-4 translate-y-8">
                    <div className="flex flex-col space-y-4 text-white">
                        <div className="space-x-2 flex items-center ">
                            <MapPin size={28} weight="fill" />
                            <h5>Kab. Kendal</h5>
                        </div>
                        <div className="explore ">Explore</div>
                        <h1 className="">PPP <span className="text-yellow-400"> Tawang</span></h1>
                        <span className="space-y-3 md:space-y-5"></span>
                        <div className="flex gap-4">
                            <Link href="#DenahSection">
                                <Button className={`text-[#163d4a] bg-white hover:text-white hover:bg-[#163d4a]/90 transition-colors duration-300`}>
                                    Explore Now
                                    <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant='outline' className="bg-transparent transition-colors duration-300 hover:text-[#163d4a]">
                                    About Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Popover>
                            <PopoverTrigger>
                                <div className="bg-white size-10 rounded-full p-2 shadow-md cursor-pointer hover:bg-neutral-200">
                                    <Cube size={24} weight="fill" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent side="left" sideOffset={24} className="space-y-4 z-40 text-[#163d4a]">
                                <h5>Model Design 3D</h5>
                                <p>Program KKN Pembuatan Design Koridor untuk PPP Tawang</p>
                                <Link href='/'>
                                    <Button variant="secondary" size="icon" className='mt-4 size-8 w-full font-semibold'>
                                        Jelajahi Program
                                        <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                    </Button>
                                </Link>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger>
                                <div className="bg-white size-10 rounded-full p-2 shadow-md cursor-pointer hover:bg-neutral-200">
                                    <MapPin size={24} weight="fill" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent side="left" sideOffset={24} className="space-y-4 z-40 text-[#163d4a]">
                                <h5>Kantor PPP Tawang</h5>
                                <p>Komplek TPI Tawang, Gempolsewu, Kec. Rowosari, Kab. kendal</p>
                                <Link href="https://maps.app.goo.gl/cjyPGziqbkpnWuzr7">
                                    <Button variant="secondary" size="icon" className='mt-4 size-8 w-full font-semibold'>
                                        Lihat di Google Maps
                                        <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                    </Button>
                                </Link>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="px-16 py-6 border-t-2 border-white/20 bg-black/30 ">
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <Badge variant="secondary" className='w-fit' >Terbaru</Badge>
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <Badge variant="secondary" className='w-fit' >Terbaru</Badge>
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="basis-64 md:basis-1/3 lg:basis-1/4">
                                <Card className="w-full relative overflow-hidden h-28">
                                    <Image
                                        src="/hero.png"
                                        alt="Gambar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                        <p className="line-clamp-2 text-sm">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 z-0" />
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}