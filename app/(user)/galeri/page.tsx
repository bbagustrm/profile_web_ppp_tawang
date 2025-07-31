"use client";
import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {useState, useRef} from "react";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";

const MarqueeCarousel = ({ items, title, direction = "left", speed = 50 }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div className="space-y-4">
            <div className="w-12 h-1.5 bg-teal-500 mx-auto " />
            <h2 className="text-center text-3xl text-[#163d4a] pb-8 md:pb-12">{title}</h2>
            <div
                ref={containerRef}
                className="overflow-hidden relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} ${isPaused ? 'pause-animation' : ''}`}
                    style={{
                        animationDuration: `${items.length * speed / 10}s`
                    }}
                >
                    {/* First set of items */}
                    {items.map((item, index) => (
                        <Card
                            key={`first-${index}`}
                            className="flex-shrink-0 w-72 overflow-hidden relative cursor-pointer marquee-card"
                            onMouseEnter={() => setHoveredIndex(`first-${index}`)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <CardContent className="p-0 relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                {/* Overlay dengan judul yang muncul saat hover */}
                                <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center marquee-overlay ${hoveredIndex === `first-${index}` ? 'opacity-100' : 'opacity-0'}`}>
                                    <p className="text-white text-center font-light px-4">
                                        {item.title}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {items.map((item, index) => (
                        <Card
                            key={`second-${index}`}
                            className="flex-shrink-0 w-72 overflow-hidden relative cursor-pointer marquee-card"
                            onMouseEnter={() => setHoveredIndex(`second-${index}`)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <CardContent className="p-0 relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                {/* Overlay dengan judul yang muncul saat hover */}
                                <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center marquee-overlay ${hoveredIndex === `second-${index}` ? 'opacity-100' : 'opacity-0'}`}>
                                    <p className="text-white text-center font-medium px-4 text-lg">
                                        {item.title}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function SejarahPage() {
    const aktivitasNelayan = [
        { title: "2025 | Beberapa Kapal Berkumpul di Dermaga", image: "/galeri/aktivitas-nelayan/2025---Beberapa-Kapal-Berkumpul-di-Dermaga.png" },
        { title: "2025 | Kapal Berlabuh di Dermaga", image: "/galeri/aktivitas-nelayan/2025---Kapal-Berlabuh-di-Dermaga.png" },
        { title: "2025 | Kapal Berlabuh di Pinggir Sungai", image: "/galeri/aktivitas-nelayan/2025---Kapal-Berlabuh-di-Pinggir-Sungai.png" },
        { title: "2025 | Kapal Besar diatas 5GT", image: "/galeri/aktivitas-nelayan/2025---Kapal-Besar-Diatas-5-GT.png" },
        { title: "2025 | Nelayan Membongkar Muatan Ikan", image: "/galeri/aktivitas-nelayan/2025---Nelayan-Membongkar-Muatan-Ikan.png" },
    ];

    const ekonomiMaritim = [
        { title: "2023 | Pertokoan Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2023---Pertokoan-Pasar-Ikan-Tawang.png" },
        { title: "2023 | Suasana Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2023---Suasana-Pasar-Ikan-Tawang.png" },
        { title: "2024 | Suasana Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2024---Suasana-Pasar-Ikan-Tawang.png" },
        { title: "2024 | Suasana Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2024---Suasana-Pasar-Ikan-Tawang-(1).png" },
        { title: "2024 | Toko Ikan Asin di Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2024---Toko-Ikan-Asin-di-Pasar-Ikan-Tawang.png" },
        { title: "2025 | Hasil Bahari Pelabuhan Ikan Tawang", image: "/galeri/ekonomi-maritim/2025---Hasil-Bahari-Pelabuhan-Ikan-Tawang.png" },
        { title: "2025 | Hasil Bahari Pelabuhan Ikan Tawang (1)", image: "/galeri/ekonomi-maritim/2025---Hasil-Bahari-Pelabuhan-Ikan-Tawang-(1).png" },
        { title: "2025 | Ikan Ikan yang Dijual di Pelabuhan Ikan Tawang oleh Pedagang", image: "/galeri/ekonomi-maritim/2025---Ikan-Ikan-yang-Dijual-di-Pelabuhan-Ikan-Tawang-oleh-Pedagang.png" },
        { title: "2025 | Petokoan Pasar Ikan Tawang", image: "/galeri/ekonomi-maritim/2025---Petokoan-Pasar-Ikan-Tawang.png" },
        { title: "2025 | Produk Bahari Kering di Pasar Tawang", image: "/galeri/ekonomi-maritim/2025---Produk-Bahari-Kering-di-Pasar-Tawang.png" },
        { title: "2025 | Produk Ikan yang Dijemur.png", image: "/galeri/ekonomi-maritim/2025---Produk-Ikan-yang-Dijemur.png" },
    ];

    const pelelanganIkan = [
        { title: "2023 | Tempat Pelelangan Ikan Tawang", image: "/galeri/pelelangan-ikan/2023---Tempat-Pelelangan-Ikan-Tawang.png" },
        { title: "2024 | Suasana Persiapan Lelang Ikan", image: "/galeri/pelelangan-ikan/2024---Suasana-Persiapan-Lelang-Ikan.png" },
        { title: "2025 | Ikan yang Dilelang", image: "/galeri/pelelangan-ikan/2025---Ikan-yang-Dilelang.png" },
        { title: "2025 | Persiapan Lelang Ikan", image: "/galeri/pelelangan-ikan/2025---Persiapan-Lelang-Ikan.png" },
        { title: "2025 | Tempat Pelelangan Ikan Tawang", image: "/galeri/pelelangan-ikan/2025---Tempat-Pelelangan-Ikan-Tawang.png" },
    ];

    const sedekahLaut = [
        { title: "2025 | Lomba Dayung", image: "/galeri/sedekah-laut/2025---Lomba-Dayung.png" },
        { title: "2025 | Lomba Dayung", image: "/galeri/sedekah-laut/2025---Lomba-Dayung-(2).png" },
        { title: "2025 | Pembukaan Acara Sedekah Laut oleh Bupati Kendal", image: "/galeri/sedekah-laut/2025---Pembukaan-Acara-Sedekah-Laut-oleh-Bupati-Kendal.png" },
        { title: "2025 | Perahu Larung Sesaji", image: "/galeri/sedekah-laut/2025---Perahu-Larung-Sesaji.png" },
        { title: "2025 | Suasana Pembukaan Acara Sedekah Laut", image: "/galeri/sedekah-laut/2025---Suasana-Pembukaan-Acara-Sedekah-Laut.png" },
    ];


    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"Galeri"} image={"/galeri.png"} description={"Jejak perjalanan dan pencapaian kami."}/>
                <div className="w-full py-16 px-8 md:px-16 lg:px-24 bg-white text-[#163d4a] space-y-16">
                    <div className="container mx-auto space-y-16">
                        <div className="flex justify-between md:items-center gap-12 flex-col md:flex-row text-[#163d4a]">
                            <div className="flex items-start gap-4 ">
                                <div className="w-1.5 h-20 bg-teal-500" />
                                <div className="flex flex-col justify-center gap-4">
                                    <h6>DOKUMENTASI</h6>
                                    <h2>Arsip Sejarah</h2>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Marquee untuk setiap kategori */}
                        <div className="space-y-12">
                            <MarqueeCarousel
                                items={aktivitasNelayan}
                                title="Aktivitas Nelayan"
                                direction="left"
                                speed={30}
                            />
                            <MarqueeCarousel
                                items={ekonomiMaritim}
                                title="Ekonomi Maritim"
                                direction="right"
                                speed={30}
                            />
                            <MarqueeCarousel
                                items={pelelanganIkan}
                                title="Pelelangan Ikan"
                                direction="left"
                                speed={30}
                            />
                            <MarqueeCarousel
                                items={sedekahLaut}
                                title="Acara Berbudaya"
                                direction="right"
                                speed={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>


        </>
    );
}