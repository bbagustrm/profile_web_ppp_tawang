"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"

export default function SaranaPrasaranaSection() {
    const [selectedTab, setSelectedTab] = useState("fungsional1")

    const fungsional1 = [
        { title: "Sarana 1", image: "/img1.jpg" },
        { title: "Sarana 2", image: "/img2.jpg" },
        { title: "Sarana 3", image: "/img3.jpg" },
        { title: "Sarana 4", image: "/img4.jpg" },
    ];

    const fungsional2 = [
        { title: "Sarana 5", image: "/img2.jpg" },
        { title: "Sarana 6", image: "/img1.jpg" },
        { title: "Sarana 7", image: "/img3.jpg" },
        { title: "Sarana 8", image: "/img4.jpg" },
    ];

    const fungsional3 = [
        { title: "Sarana 9", image: "/img5.jpg" },
        { title: "Sarana 10", image: "/img6.jpg" },
        { title: "Sarana 11", image: "/img1.jpg" },
        { title: "Sarana 12", image: "/img2.jpg" },
    ];

    const data = {
        fungsional1,
        fungsional2,
        fungsional3
    }
    return (
        <div className="py-16 px-8 lg:px-16 xl:px-24 bg-white text-[#163d4a] space-y-16">
            <div className="flex justify-between md:items-center gap-12 flex-col md:flex-row text-[#163d4a]">
                <div className="flex items-start gap-4 ">
                    <div className="w-1.5 h-20 bg-teal-500" />
                    <div className="flex flex-col justify-center gap-4">
                        <h6>DOKUMENTASI</h6>
                        <h2>Sarana dan Prasarana</h2>
                    </div>
                </div>
            </div>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full space-y-8 text-[#163d4a]">
                <div className="overflow-x-auto">
                    <TabsList className="w-max whitespace-nowrap flex gap-2">
                        <TabsTrigger value="fungsional1" className="px-8">Fungsional 1</TabsTrigger>
                        <TabsTrigger value="fungsional2" className="px-8">Fungsional 2</TabsTrigger>
                        <TabsTrigger value="fungsional3" className="px-8">Fungsional 3</TabsTrigger>
                    </TabsList>
                </div>

                {Object.entries(data).map(([key, items]) => (
                    <TabsContent key={key} value={key}>
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent>
                                {items.map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="md:basis-1/2 lg:basis-1/3 px-2"
                                    >
                                        <Card className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-64 object-cover"
                                                />
                                                <div className="p-4 text-center font-medium">
                                                    {item.title}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className={"absolute top-1/2 left-4"} />
                            <CarouselNext className={"absolute top-1/2 right-4"} />
                        </Carousel>
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    );
}
