'use client'

import Image from "next/image";
import {CalendarDays, ArrowLeft, ArrowRight} from "lucide-react";
import {useMemo, useState} from "react";

const newsData = [
    {
        id: 1,
        title: "Pelelangan Ikan Mencapai Rekor Tertinggi",
        date: "07 Juli 2025",
        description: "Hasil tangkapan nelayan local mencapai angka tertinggi dalam sejarah. Pelelangan ikan di TPI mencetak rekor baru dengan total transaksi mencapai 5 miliar rupiah dalam sehari.",
        image: "/img1.jpg"
    },
    {
        id: 2,
        title: "Festival Kuliner Seafood 2025",
        date: "08 Juli 2025",
        description: "Festival tahunan kuliner seafood kembali digelar dengan menampilkan berbagai hidangan khas laut. Lebih dari 50 stand kuliner berpartisipasi dalam acara ini.",
        image: "/img2.jpg"
    },
    {
        id: 3,
        title: "Modernisasi Fasilitas Pasar Ikan",
        date: "09 Juli 2025",
        description: "Pemkot mengucurkan dana sebesar 10 miliar untuk modernisasi fasilitas pasar ikan. Renovasi akan mencakup sistem pendingin dan area bongkar muat.",
        image: "/img3.jpg"
    },
    {
        id: 4,
        title: "Pelatihan Pengolahan Hasil Laut",
        date: "10 Juli 2025",
        description: "Program pelatihan pengolahan hasil laut untuk UKM local dilaksanakan selama sebulan. Bertujuan meningkatkan nilai tambah produk perikanan.",
        image: "/img4.jpg"
    },
    {
        id: 5,
        title: "Ekspor Hasil Laut Meningkat",
        date: "11 Juli 2025",
        description: "Ekspor hasil laut dari pelabuhan setempat mengalami peningkatan signifikan. Jepang dan Korea Selatan menjadi tujuan utama ekspor.",
        image: "/img5.jpg"
    },
    {
        id: 6,
        title: "Program Pemberdayaan Nelayan",
        date: "12 Juli 2025",
        description: "Pemerintah meluncurkan program pemberdayaan nelayan melalui digitalisasi sistem penjualan. Para nelayan akan dibekali pelatihan penggunaan aplikasi.",
        image: "/img6.jpg"
    }
];
export default function BeritaSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const SLIDES_TO_SHOW = 3;

    // Calculate whether we should show navigation
    const { showNavigation, isAtStart, isAtEnd } = useMemo(() => {
        const totalSlides = newsData.length;

        // Hide navigation if there are fewer or equal slides than what we want to show
        const showNavigation = totalSlides > SLIDES_TO_SHOW;

        // Check if we're at the start or end of the slides
        const isAtStart = currentSlide === 0;
        const isAtEnd = currentSlide >= totalSlides - SLIDES_TO_SHOW;

        return { showNavigation, isAtStart, isAtEnd };
    }, [currentSlide]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? newsData.length - SLIDES_TO_SHOW : prev - 1
        );
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) =>
            prev >= newsData.length - SLIDES_TO_SHOW ? 0 : prev + 1
        );
    };

    return (
        <div className="container mx-auto py-16">
            <div className="relative group">
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentSlide * (100 / SLIDES_TO_SHOW)}%)`,
                        }}
                    >
                        {newsData.map((news) => (
                            <div
                                key={news.id}
                                className="flex-none w-[calc((100%-2rem)/3)]"
                            >
                                <div className="relative aspect-square rounded-lg overflow-hidden transition duration-200 group/item">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        priority
                                        className="object-cover brightness-75 transition duration-200 group-hover/item:brightness-[.4]"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end text-white p-8 space-y-2">
                                        <h3 className="text-xl font-bold">{news.title}</h3>
                                        <div className="flex gap-2 items-center">
                                            <CalendarDays size={20} />
                                            <h5>{news.date}</h5>
                                        </div>
                                        <p className="line-clamp-2">{news.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons - Only show if there are more slides than SLIDES_TO_SHOW */}
                    {showNavigation && (
                        <>
                            {/* Previous Button - Hide when at start */}
                            {!isAtStart && (
                                <button
                                    onClick={handlePrevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2
                                             text-white bg-black/50 rounded-full
                                             opacity-0 group-hover:opacity-100
                                             transition-opacity duration-300
                                             hover:bg-black/70"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}

                            {/* Next Button - Hide when at end */}
                            {!isAtEnd && (
                                <button
                                    onClick={handleNextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2
                                             text-white bg-black/50 rounded-full
                                             opacity-0 group-hover:opacity-100
                                             transition-opacity duration-300
                                             hover:bg-black/70"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Dots Navigation - Only show if there are more slides than SLIDES_TO_SHOW */}
                {showNavigation && (
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: Math.ceil(newsData.length / SLIDES_TO_SHOW) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index * SLIDES_TO_SHOW)}
                                className={`w-2 h-2 rounded-full transition-all duration-300
                                    ${Math.floor(currentSlide / SLIDES_TO_SHOW) === index
                                    ? 'bg-primary w-4'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
