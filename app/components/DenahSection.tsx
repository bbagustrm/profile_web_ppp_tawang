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
    const SLIDES_TO_SHOW = 3;

    const activeContent = contentData.find(item => item.id === activeTab);

    // Calculate navigation state
    const { showNavigation, isAtStart, isAtEnd } = useMemo(() => {
        if (!activeContent) return { showNavigation: false, isAtStart: true, isAtEnd: true };

        const totalSlides = activeContent.images.length;
        const showNavigation = totalSlides > SLIDES_TO_SHOW;
        const isAtStart = currentSlide === 0;
        const isAtEnd = currentSlide >= totalSlides - SLIDES_TO_SHOW;

        return { showNavigation, isAtStart, isAtEnd };
    }, [currentSlide, activeContent]);

    // Reset image index when changing tabs
    useEffect(() => {
        setCurrentSlide(0);
    }, [activeTab]);

    const handlePrevSlide = () => {
        if (!activeContent) return;
        setCurrentSlide((prev) =>
            prev === 0 ? activeContent.images.length - SLIDES_TO_SHOW : prev - 1
        );
    };

    const handleNextSlide = () => {
        if (!activeContent) return;
        setCurrentSlide((prev) =>
            prev >= activeContent.images.length - SLIDES_TO_SHOW ? 0 : prev + 1
        );
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div className="w-full lg:w-[35%] my-20">
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
                <div className="w-full lg:w-[65%] space-y-8">
                    <div className="flex border-b-2 border-b-border group">
                        {contentData.map((item) => (
                            <Button
                                key={item.id}
                                className={`button-link relative py-6 
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

                    {activeContent && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="flex gap-4 items-center">
                                {activeContent.icon}
                                <h3>{activeContent.title}</h3>
                            </div>
                            <p>{activeContent.description}</p>
                            <div className="relative group">
                                <div className="relative overflow-hidden">
                                    <div
                                        className="flex gap-2 transition-transform duration-500 ease-out"
                                        style={{
                                            transform: `translateX(-${currentSlide * (100 / SLIDES_TO_SHOW)}%)`,
                                        }}
                                    >
                                        {activeContent?.images.map((img, index) => (
                                            <div
                                                key={img}
                                                className="flex-none w-[calc((100%-2rem)/3)]"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${activeContent.title} Image ${index + 1}`}
                                                    width={300}
                                                    height={160}
                                                    className="w-full h-[160px] object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation Buttons */}
                                    {showNavigation && (
                                        <>
                                            {!isAtStart && (
                                                <button
                                                    onClick={handlePrevSlide}
                                                    className="absolute left-10 top-1/2 -translate-y-1/2 z-10 p-2
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
                                                    className="absolute right-10 top-1/2 -translate-y-1/2 z-10 p-2
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
                                        {Array.from({ length: Math.ceil((activeContent?.images.length || 0) / SLIDES_TO_SHOW) }).map((_, index) => (
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
                    )}
                </div>
            </div>
        </div>
    );
}