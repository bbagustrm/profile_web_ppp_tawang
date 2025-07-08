'use client'

import Image from "next/image";
import {Store, ExternalLink, Fish, Utensils, ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@radix-ui/themes";
import {useState, useEffect, useMemo} from "react";

const contentData = [
    {
        id: 'pasar',
        title: 'Pasar Ikan Laut',
        icon: <Store size={32}/>,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec urna orci. Proin tempus varius congue. Proin commodo vulputate tellus, sed dignissim risus viverra in. Ut at enim finibus, pretium leo ullamcorper, aliquam mauris. Vivamus commodo dolor in justo blandit interdum. Quisque sollicitudin laoreet neque sed molestie. Pellentesque molestie posuere felis, at blandit ex ornare vitae. Phasellus porttitor at leo nec luctus. Sed ut metus vitae odio finibus eleifend quis in leo. ',
        images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg', '/img6.jpg' ],
        mapImage: '/map1.png'
    },
    {
        id: 'tpi',
        title: 'Tempat Pelelangan Ikan',
        icon: <Fish size={32}/>,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec urna orci. Proin tempus varius congue. Proin commodo vulputate tellus, sed dignissim risus viverra in. Ut at enim finibus, pretium leo ullamcorper, aliquam mauris. Vivamus commodo dolor in justo blandit interdum. Quisque sollicitudin laoreet neque sed molestie. Pellentesque molestie posuere felis, at blandit ex ornare vitae. Phasellus porttitor at leo nec luctus. Sed ut metus vitae odio finibus eleifend quis in leo. ',
        images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg', '/img6.jpg' ],
        mapImage: '/map2.png'
    },
    {
        id: 'kuliner',
        title: 'Kuliner',
        icon: <Utensils size={32}/>,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec urna orci. Proin tempus varius congue. Proin commodo vulputate tellus, sed dignissim risus viverra in. Ut at enim finibus, pretium leo ullamcorper, aliquam mauris. Vivamus commodo dolor in justo blandit interdum. Quisque sollicitudin laoreet neque sed molestie. Pellentesque molestie posuere felis, at blandit ex ornare vitae. Phasellus porttitor at leo nec luctus. Sed ut metus vitae odio finibus eleifend quis in leo. ',
        images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg', '/img6.jpg' ],
        mapImage: '/map3.png'
    }
];

export default function DenahSection() {
    const [activeTab, setActiveTab] = useState('pasar');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const getSlidesToShow = () => {
        if (windowWidth >= 1280) return 4; // xl
        if (windowWidth >= 1024) return 3; // lg
        if (windowWidth >= 768) return 2;  // md
        return 1; // mobile
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCurrentSlide(0); // Reset slide position on resize
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeContent = contentData.find(item => item.id === activeTab);

    // Calculate navigation state
    const { showNavigation, isAtStart, isAtEnd } = useMemo(() => {
        if (!activeContent) return { showNavigation: false, isAtStart: true, isAtEnd: true };

        const totalSlides = activeContent.images.length;
        const slidesToShow = getSlidesToShow();
        const showNavigation = totalSlides > slidesToShow;
        const isAtStart = currentSlide === 0;
        const isAtEnd = currentSlide >= totalSlides - slidesToShow;

        return { showNavigation, isAtStart, isAtEnd };
    }, [currentSlide, activeContent, windowWidth]);

    // Reset image index when changing tabs
    useEffect(() => {
        setCurrentSlide(0);
    }, [activeTab]);

    const handlePrevSlide = () => {
        if (!activeContent) return;
        setCurrentSlide(prev => Math.max(0, prev - 1));
    };

    const handleNextSlide = () => {
        if (!activeContent) return;
        const slidesToShow = getSlidesToShow();
        const maxSlide = activeContent.images.length - slidesToShow;
        setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
    };

    return (
        <div className="container mx-auto space-y-16">
            <div className="flex flex-col-reverse lg:flex-row gap-12 justify-between">
                {/* Map */}
                <div className="w-full mx-auto md:w-[60%] lg:w-[40%] xl:w-[30%] xl:pt-0 ">
                    <div className="lg:sticky lg:top-8 lg:h-fit">
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                            <Image
                                src={activeContent?.mapImage || '/map1.png'}
                                alt="Denah Image"
                                fill
                                priority
                                className="object-cover transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end">
                                <Button className="button-default w-full justify-between px-4 rounded-none hover:bg-gray-100 hover:text-primary hover:outline-none duration-0">
                                    Lihat di Google Maps
                                    <ExternalLink size={24}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Deskripsi */}
                <div className="w-full lg:w-[60%] xl:w-[70%] space-y-8">
                    {/* Navbar */}
                    <div className="overflow-x-auto">
                        <div className="flex border-b-2 border-b-border group min-w-max">
                            {contentData.map((item) => (
                                <Button
                                    key={item.id}
                                    className={`button-link px-8 relative pt-0 pb-6 justify-center text-center
                                    ${activeTab === item.id
                                        ? 'border-b-2 border-b-primary text-primary group-hover:[&:not(:hover)]:border-transparent'
                                        : 'text-variant'
                                    }
                                        hover:border-b-2 hover:border-b-primary hover:text-primary
                                        transition-all duration-300
                                    `}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <h4>{item.title}</h4>
                                </Button>
                            ))}
                        </div>
                    </div>
                    {/*Penjelasan */}
                    {activeContent && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="flex gap-4 items-center">
                                {activeContent.icon}
                                <h3>{activeContent.title}</h3>
                            </div>
                            <p>{activeContent.description}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Image Preview */}
            <div className="relative group mt-8">
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-2 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentSlide * (100 / getSlidesToShow())}%)`,
                        }}
                    >
                        {activeContent?.images.map((img, index) => (
                            <div
                                key={img}
                                className="flex-none w-full md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3) xl:w-[calc((100%-3rem)/4)]"
                            >
                                <Image
                                    src={img}
                                    alt={`${activeContent.title} Image ${index + 1}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-[300px] md:h-[240px] lg:h-[180px] object-cover rounded-lg"/>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {showNavigation && (
                        <>
                            {!isAtStart && (
                                <button
                                    onClick={handlePrevSlide}
                                    className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-10 p-2
                                         text-white bg-black/50 rounded-full opacity-0
                                         group-hover:opacity-100 transition-opacity duration-300
                                         hover:bg-black/70 -translate-x-1/2"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}

                            {!isAtEnd && (
                                <button
                                    onClick={handleNextSlide}
                                    className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-10 p-2
                                         text-white bg-black/50 rounded-full opacity-0
                                         group-hover:opacity-100 transition-opacity duration-300
                                         hover:bg-black/70 translate-x-1/2"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Dots Navigation */}
                {showNavigation && (
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({
                            length: Math.ceil(
                                (activeContent?.images.length || 0) / getSlidesToShow()
                            )
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300
                                    ${Math.floor(currentSlide / getSlidesToShow()) === index
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