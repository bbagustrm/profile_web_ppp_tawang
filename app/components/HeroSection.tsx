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
import {ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useEffect, useState } from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { Skeleton } from "@/components/ui/skeleton";


interface Berita {
    id: string;
    title: string;
    content: string;
    image_path?: string | null;
    created_at: string;
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}

export default function HeroSection() {
    const supabase = createClientComponentClient();
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBerita = async () => {
            const { data, error } = await supabase
                .from("berita")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(8);

            if (error) {
                console.error("Gagal fetch berita:", error.message);
            } else {
                setBerita(data || []);
            }

            setLoading(false);
        };

        fetchBerita();
    }, []);

    return (
        <div className="relative w-full h-[768px]">
            <Image
                src="/hero.png"
                alt="Hero Image"
                fill
                priority
                className="object-cover brightness-90"
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
                                <Button className={`text-[#163d4a] bg-white hover:text-white hover:bg-[#163d4a]/90 hover:border-[0.5px] hover:border-white transition-colors duration-300`}>
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
                                    <Cube size={24} weight="fill" className={"text-teal-600"}/>
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
                                    <MapPin size={24} weight="fill" className={"text-teal-600"}/>
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
                <div className="py-6 border-t-2 border-white/20 bg-black/30 ">
                    <Carousel>
                        <CarouselContent className='px-16'>
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <CarouselItem key={i} className="basis-64 md:basis-1/3 lg:basis-1/4">
                                        <Card className="w-full relative overflow-hidden h-28">
                                            <Skeleton className="absolute inset-0 w-full h-full" />
                                        </Card>
                                    </CarouselItem>
                                ))
                            ) : berita.length > 0 ? (
                                berita.map((item) => (
                                    <CarouselItem key={item.id} className="basis-64 md:basis-1/3 lg:basis-1/4">
                                        <Link href={`/news/${item.id}`} className="block group">
                                            <Card className="w-full relative overflow-hidden h-28 brightness-75 group-hover:brightness-100 transition duration-300">
                                                <Image
                                                    src={item.image_path || "/placeholder.jpg"}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover w-full h-full transition duration-300 brightness-75 "
                                                />
                                                <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-2 gap-2 text-white">
                                                    <Badge variant="secondary" className='w-fit'>Terbaru</Badge>
                                                    <h5 className="line-clamp-1">{item.title}</h5>
                                                    <p className="text-xs line-clamp-2">{stripHtml(item.content)}</p>
                                                </div>
                                                <div className="absolute inset-0 bg-black/30 z-0" />
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem className="basis-full text-center text-white py-4">
                                    Tidak ada berita terbaru.
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious className={"absolute top-1/2 left-4"} />
                        <CarouselNext className={"absolute top-1/2 right-4"} />
                    </Carousel>
                </div>
                <div className="bg-teal-500 overflow-hidden pb-2">
                    <Link href="/pengaduan">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="w-full bg-transparent hover:bg-transparent hover:text-black"
                        >
                            <div className="marquee-container">
                                <div className="marquee-content">
                                    <div className="marquee-item">
                                        <p className="text-sm">
                                            <span>[PENGADUAN] Sampaikan keluhan, masukan, dan aspirasi Anda dengan mudah melalui layanan pengaduan PPP Tawang. </span>
                                        </p>
                                        <ArrowRight size={20} className="md:w-6 md:h-6 ml-4" />
                                    </div>

                                    <div className="marquee-item">
                                        <p className="text-sm">
                                            <span>[PENGADUAN] Sampaikan keluhan, masukan, dan aspirasi Anda dengan mudah melalui layanan pengaduan PPP Tawang. S</span>
                                        </p>
                                        <ArrowRight size={20} className="md:w-6 md:h-6 ml-4" />
                                    </div>
                                </div>
                            </div>
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}