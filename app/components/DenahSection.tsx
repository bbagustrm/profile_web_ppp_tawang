'use client'

import Image from "next/image";
import { useState } from "react";
import {Buildings, Fish, Storefront, Boat, ForkKnife} from "phosphor-react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import {
    ScrollArea,
    ScrollBar,
} from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

const contentData = [
    {
        id: 'kantor',
        title: 'Kantor PPP Tawang',
        icon: <Buildings size={32} weight="fill" className="text-teal-600"/>,
        time: '08.00 - 15.30 WIB',
        description: 'Kantor Pelabuhan Perikanan Pantai (PPP) Tawang melayani masyarakat setiap hari kerja mulai pukul 08.00 hingga 15.30 WIB. Berbagai layanan disediakan, mulai dari administrasi keluar masuk kapal perikanan, tambat labuh, bongkar muat dan pelelangan ikan, hingga pembinaan serta pengawasan mutu hasil tangkapan. Selain itu, kantor ini juga berperan dalam pemantauan dan pengendalian penangkapan ikan serta koordinasi pembinaan nelayan.',
        images: ['/kantor/kantor1.png', '/kantor/kantor2.png', '/kantor/kantor3.png', '/kantor/kantor4.png', '/kantor/kantor5.png', '/kantor/kantor6.png', '/kantor/kantor7.png', '/kantor/kantor8.png'],
        mapImage: '/map/kantor.png'
    },
    {
        id: 'tpi',
        title: 'Tempat Pelelangan Ikan',
        icon: <Fish size={32} weight="fill" className="text-teal-600" />,
        time: '13.00 - 15.00 WIB',
        description: 'Pasar ikan laut di sekitar PPP Tawang tidak hanya menjadi pusat jual beli hasil laut segar dan kering, tetapi juga destinasi favorit untuk mencari oleh-oleh khas pesisir. Buka setiap hari pukul 03.00–16.00 WIB, pasar ini menyediakan berbagai pilihan ikan segar hasil tangkapan langsung dari nelayan, serta aneka ikan kering seperti ikan asin, teri, dan udang kering yang awet dan cocok dibawa pulang.',
        images: ['/tpi/tpi1.png', '/tpi/tpi2.png', '/tpi/tpi3.png', '/tpi/tpi4.png', '/tpi/tpi5.png', '/tpi/tpi6.png'],
        mapImage: '/map/tpi.png'
    },
    {
        id: 'pasar',
        title: 'Pasar Ikan Laut',
        icon: <Storefront size={32} weight="fill" className="text-teal-600"/>,
        time: '03.00 - 16.00 WIB',
        description: 'Pasar ikan laut di sekitar PPP Tawang tidak hanya menjadi pusat jual beli hasil laut segar dan kering, tetapi juga destinasi favorit untuk mencari oleh-oleh khas pesisir. Buka setiap hari pukul 03.00–16.00 WIB, pasar ini menyediakan berbagai pilihan ikan segar hasil tangkapan langsung dari nelayan, serta aneka ikan kering seperti ikan asin, teri, dan udang kering yang awet dan cocok dibawa pulang.',
        images: ['/pasar/pasar1.png', '/pasar/pasar2.png', '/pasar/pasar3.png', '/pasar/pasar4.png', '/pasar/pasar5.png', '/pasar/pasar6.png'],
        mapImage: '/map/pasar.png'
    },
    {
        id: 'dermaga',
        title: 'Dermaga Kapal',
        icon: <Boat size={32} weight="fill" className="text-teal-600"/>,
        time: 'Buka 24 Jam',
        description: 'Dermaga di PPP Tawang beroperasi 24 jam dan menjadi titik penting bagi aktivitas perikanan. Di sinilah para nelayan berlabuh setelah melaut, membawa hasil tangkapan segar yang kemudian akan dijual di Tempat Pelelangan Ikan (TPI). Dermaga ini mendukung kelancaran kegiatan bongkar muat serta menjadi awal dari rantai distribusi hasil laut segar di wilayah Tawang. ',
        images: ['/dermaga/dermaga1.png', '/dermaga/dermaga2.png', '/dermaga/dermaga3.png', '/dermaga/dermaga4.png', '/dermaga/dermaga5.png', '/dermaga/dermaga6.png'],
        mapImage: '/map/dermaga.png'
    },
    {
        id: 'kios',
        title: 'Kios dan Kuliner',
        icon: <ForkKnife size={32} weight="fill" className="text-teal-600"/>,
        time: 'Buka 08.00 - 18.00',
        description: 'Area kios dan kuliner di PPP Tawang buka setiap hari pukul 08.00 hingga 18.00 WIB, menghadirkan berbagai jajanan dan produk UMKM lokal yang menggugah selera. Berlokasi di tepi sungai, tempat ini sering dijadikan lokasi bersantai dan bermain oleh masyarakat, terutama di sore hari. Suasana sungai yang tenang berpadu dengan keramahan penjual dan ragam kuliner khas menjadikan area ini pilihan tepat untuk menikmati waktu bersama keluarga atau teman.',
        images: ['/umkm/umkm1.png', '/umkm/umkm2.png', '/umkm/umkm3.png', '/umkm/umkm4.png', '/umkm/umkm5.png'],
        mapImage: '/map/umkm.png'
    }
];

export default function DenahSection() {
    const [activeTab, setActiveTab] = useState('kantor');
    const activeContent = contentData.find((item) => item.id === activeTab);

    return (
        <div className="container mx-auto py-16 px-8 lg:px-16 xl:px-24">
            <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
                <h6>SPOTLIGHT</h6>
                <h2>Denah dan Lokasi</h2>
            </div>
            <div id="DenahSection" className="container mx-auto space-y-16">
                <div className="flex flex-col-reverse lg:flex-row gap-12 justify-between">
                    {/* Map */}
                    <div className="w-4/5 mx-auto md:w-[60%] lg:w-[40%] xl:w-[30%] xl:pt-0">
                        <div className="lg:sticky lg:top-8 lg:h-fit">
                            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                                <Image
                                    src={activeContent?.mapImage || '/map1.png'}
                                    alt="Denah Image"
                                    fill
                                    priority
                                    className="object-cover transition-opacity duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi dan Tabs */}
                    <div className="w-full lg:w-[60%] xl:w-[70%]">
                        <Tabs defaultValue={"kantor"} onValueChange={setActiveTab} className='w-full space-y-8 text-[#163d4a]'>
                            <ScrollArea
                                className="w-full h-full overflow-y-hidden "
                                scrollHideDelay={0}
                            >
                                <TabsList className="h-full flex w-max bg-transparent">
                                    {contentData.map((item) => (
                                        <TabsTrigger
                                            key={item.id}
                                            value={item.id}
                                            className=" px-6 py-4 text-sm font-medium bg-transparent border-b-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-[#163d4a] data-[state=active]:text-[#163d4a] data-[state=active]:shadow-none"
                                        >
                                            {item.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            {contentData.map((item) => (
                                <TabsContent key={item.id} value={item.id} className="space-y-6 animate-fadeIn">
                                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                                        <div className='flex gap-4'>
                                            {item.icon}
                                            <h3 className="text-xl font-semibold">{item.title}</h3>
                                        </div>
                                        <Badge variant="secondary" className='w-fit text-right'>{item.time}</Badge>
                                    </div>
                                    <p>{item.description}</p>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>

                {activeContent?.images?.length ? (
                    <Carousel opts={{ align: "start" }} className="w-full mx-auto lg:w-full">
                        <CarouselContent className="gap-0">
                            {activeContent.images.map((img, index) => (
                                <CarouselItem
                                    key={img}
                                    className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <div className="">
                                        <Image
                                            src={img}
                                            alt={`${activeContent.title} Image ${index + 1}`}
                                            width={400}
                                            height={300}
                                            className="w-full h-[200px] md:h-[220px] lg:h-[180px] object-cover rounded-lg"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className={"absolute top-1/2 left-4"} />
                        <CarouselNext className={"absolute top-1/2 right-4"} />
                    </Carousel>
                ) : null}

            </div>
        </div>
    );
}
