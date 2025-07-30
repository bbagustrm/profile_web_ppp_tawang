"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"

export default function SaranaPrasaranaSection() {
    const [selectedTab, setSelectedTab] = useState("pokok")

    const pokok = [
        { title: "Alur Pelayaran", image: "/sarpras/pokok/alur-pelayaran.png" },
        { title: "Penahan Gelombang", image: "/sarpras/pokok/penahan-gelombang.png" },
        { title: "Lahan PPP Tawang", image: "/sarpras/pokok/lahan.png" },
        { title: "Jalan Komplek", image: "/sarpras/pokok/jalan-komplek.png" },
        { title: "Dermaga", image: "/sarpras/pokok/dermaga.png" },
    ];

    const fungsional = [
        { title: "Tempat Pelelangan Ikan (TPI)", image: "/sarpras/fungsional/tpi.png" },
        { title: "Suar", image: "/sarpras/fungsional/suar.png" },
        { title: "Rambu Lampu Penuntun", image: "/sarpras/fungsional/rambu-penuntun.png" },
        { title: "Telepon/Internet", image: "/sarpras/fungsional/telepon-internet.png" },
        { title: "Air Bersih", image: "/sarpras/fungsional/air-bersih.png" },
        { title: "Listrik", image: "/sarpras/fungsional/listrik.png" },
        { title: "SPBN (BBM)", image: "/sarpras/fungsional/spbn.png" },
        { title: "Kantor PPP Tawang", image: "/sarpras/fungsional/kantor.png" },
        { title: "Pos Kamladu", image: "/sarpras/fungsional/poskamladu.png" },
        { title: "Perbankan", image: "/sarpras/fungsional/perbankan.png" },
        { title: "Kontainer Sampah", image: "/sarpras/fungsional/kontainer-sampah.png" },
    ];

    const penunjang = [
        { title: "Ruang Pelayanan", image: "/sarpras/penunjang/ruang-pelayanan.png" },
        { title: "Ruang Pertemuan", image: "/sarpras/penunjang/ruang-pertemuan.png" },
        { title: "Mushola", image: "/sarpras/penunjang/mushola.png" },
        { title: "MCK", image: "/sarpras/penunjang/mck.png" },
        { title: "Kios Depan", image: "/sarpras/penunjang/kios-depan.png" },
        { title: "Kios Belakang", image: "/sarpras/penunjang/kios-belakang.png" },
        { title: "Lapak", image: "/sarpras/penunjang/lapak.png" },
        { title: "Gudang Blong/Garam/Es", image: "/sarpras/penunjang/gudang-garam.png" },
        { title: "Pos Jaga", image: "/sarpras/penunjang/pos-jaga.png" },
        { title: "Areal Parkir", image: "/sarpras/penunjang/area-parkir.png" },
        { title: "Monitoring Cuaca BMKG", image: "/sarpras/penunjang/monitor-cuaca-bmkg.png" },
    ];

    const data = {
        pokok,
        fungsional,
        penunjang
    }
    return (
        <div className="w-full py-16 px-8 md:px-16 lg:px-24 bg-white text-[#163d4a] space-y-16">
            <div className="container mx-auto space-y-16">
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
                            <TabsTrigger value="pokok" className="px-8">Pokok</TabsTrigger>
                            <TabsTrigger value="fungsional" className="px-8">Fungsional</TabsTrigger>
                            <TabsTrigger value="penunjang" className="px-8">Penunjang</TabsTrigger>
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
                                                        className="w-full h-48 object-cover"
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
        </div>
    );
}
