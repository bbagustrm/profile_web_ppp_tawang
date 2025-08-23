'use client'

import { useState } from 'react'
import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Download } from "lucide-react"
import Image from "next/image";
// Data untuk carousel media
const mediaItems = [
    { type: 'video', src: 'https://www.youtube.com/embed/poJsqc81r4c?si=zU0uOtzKJkvuKV4N', title: 'Video Koridor', thumbnail: 'kelompok1.jpg' },
    { type: 'image', src: '/koridor/gerbang.jpg', title: 'Kios 48', thumbnail: '/koridor/gerbang.jpg' },
    { type: 'image', src: '/koridor/dermaga (0).jpg', title: 'Gerbang Dermaga', thumbnail: '/koridor/dermaga (0).jpg' },
    { type: 'image', src: '/koridor/dermaga (1).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (1).jpg' },
    { type: 'image', src: '/koridor/dermaga (2).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (2).jpg' },
    { type: 'image', src: '/koridor/dermaga (3).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (3).jpg' },
    { type: 'image', src: '/koridor/dermaga (4).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (4).jpg' },
    { type: 'image', src: '/koridor/dermaga (5).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (5).jpg' },
    { type: 'image', src: '/koridor/dermaga (6).jpg', title: 'Dermaga', thumbnail: '/koridor/dermaga (6).jpg' },
    { type: 'image', src: '/koridor/kios40 (1).jpg', title: 'Kios 40', thumbnail: '/koridor/kios40 (1).jpg' },
    { type: 'image', src: '/koridor/kios40 (2).jpg', title: 'Kios 40', thumbnail: '/koridor/kios40 (2).jpg' },
    { type: 'image', src: '/koridor/kios40 (3).jpg', title: 'Kios 40', thumbnail: '/koridor/kios40 (3).jpg' },
    { type: 'image', src: '/koridor/kios48 (1).jpg', title: 'Kios 48', thumbnail: '/koridor/kios48 (1).jpg' },
    { type: 'image', src: '/koridor/kios48 (2).jpg', title: 'Kios 48', thumbnail: '/koridor/kios48 (2).jpg' },
    { type: 'image', src: '/koridor/kios48 (3).jpg', title: 'Kios 48', thumbnail: '/koridor/kios48 (3).jpg' },
    { type: 'image', src: '/koridor/kios13.jpg', title: 'Kios 48', thumbnail: '/koridor/kios13.jpg' },
    { type: 'image', src: '/koridor/tpst.jpg', title: 'Kios 48', thumbnail: '/koridor/tpst.jpg' },
]

export default function KoridorPage() {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

    // ID file Google Drive
    const pdfFileId = "1_oPn8N-_RKWSydXt8mjT8iEhFCuYBm6f"

    // Link view dan download
    const pdfViewUrl = `https://drive.google.com/file/d/${pdfFileId}/view?usp=sharing`
    const pdfDownloadUrl = `https://drive.google.com/uc?export=download&id=${pdfFileId}`

    const handleViewPDF = () => {
        window.open(pdfViewUrl, '_blank')
    }

    const handleDownloadPDF = () => {
        window.open(pdfDownloadUrl, '_blank')
    }

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen">
                <HeroSection2
                    title={"Design 3D"}
                    image={"/koridor.jpg"}
                    description={"Program KKN IDBU-83 Universitas Diponegoro"}
                />

                <div className="container mx-auto mt-12 text-[#163d4a] ">
                    {/* Main Content Section */}
                    <div className="flex flex-col px-4 md:px-0 md:gap-8 justify-center mb-12">
                        {/* Left Side - Media Display Section */}
                        <div>
                            <Card className="mb-4">
                                <CardContent className="p-0">
                                    {/* Main Media Display */}
                                    <div className="relative bg-muted rounded-t-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                        {mediaItems[currentMediaIndex].type === 'video' ? (
                                            <iframe
                                                src={mediaItems[currentMediaIndex].src}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={mediaItems[currentMediaIndex].title}
                                            />
                                        ) : (
                                            <img
                                                src={mediaItems[currentMediaIndex].src}
                                                alt={mediaItems[currentMediaIndex].title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Carousel Navigation */}
                                    <div className="p-2">
                                        <Carousel opts={{ align: "start", loop: false }} className="w-full">
                                            <CarouselContent >
                                                {mediaItems.map((item, index) => (
                                                    <CarouselItem
                                                        key={index}
                                                        className=" basis-1/2 md:basis-1/4"
                                                    >
                                                        <Card
                                                            className={`cursor-pointer transition-all overflow-hidden duration-200 ${
                                                                currentMediaIndex === index
                                                                    ? 'border-[3px] border-teal-500'
                                                                    : 'hover:border-[3px] hover:border-teal-500'
                                                            }`}
                                                            onClick={() => setCurrentMediaIndex(index)}
                                                        >
                                                            <CardContent className="p-0">
                                                                <div className="relative aspect-video overflow-hidden">
                                                                    <img
                                                                        src={item.thumbnail}
                                                                        alt={item.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="left-2" />
                                            <CarouselNext className="right-2" />
                                        </Carousel>

                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Side - Scrollable Description */}
                        <div className="flex flex-col">
                            <Card className="flex-1 mb-4 ">
                                <CardHeader className="border-b-2 border-border">
                                    <CardTitle className="text-[#163d4a] leading-tight ">
                                        <h3 className="leading-normal text-2xl">Redesain Dermaga dan Koridor Pedagang Ikan di P3 Tawang</h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col md:flex-row gap-4 md:gap-8">
                                    {/* Text Section */}
                                    <ScrollArea className="h-full pt-6 md:basis-3/5 order-2 md:order-1">
                                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed text-justify">
                                            <p>
                                                Kuliah Kerja Nyata (KKN) Multidisiplin Universitas kami dilaksanakan di Pelabuhan Perikanan Pantai (PPP) Desa Gempolsewu, Kecamatan Rowosari, Kabupaten Kendal, yang menjadi pusat aktivitas ekonomi sektor perikanan. Tim KKN melakukan observasi langsung terhadap kondisi kawasan bersama pihak pengelola, menemukan bahwa PPP memiliki tiga komponen utama: tempat pelelangan ikan, dua zona kios pedagang ikan (70 kios dekat dermaga dan 48 kios di koridor belakang), serta kios pedagang sembako di pintu masuk. Aktivitas ekonomi cukup dinamis, namun distribusi pengunjung belum merata di seluruh zona kios.
                                            </p>
                                            <p>
                                                Permasalahan utama adalah penataan kios yang terlalu memanjang tanpa zonasi dan sirkulasi pengunjung yang optimal, membuat kios bagian depan lebih ramai sementara kios belakang sepi. Tim KKN mengusulkan redesain koridor dengan zonasi dan pemanfaatan ruang vertikal, termasuk pembangunan lantai dua untuk kios ikan serta penataan jalur sesuai jenis komoditas. Solusi ini diharapkan meningkatkan pemerataan pengunjung, memperbaiki sirkulasi, dan membuka peluang ekonomi yang setara bagi seluruh pedagang.
                                            </p>
                                        </div>
                                    </ScrollArea>

                                    {/* Image and Buttons Section */}
                                    <div className="pt-6 md:basis-2/5 order-1 md:order-2">
                                        {/* Image Container */}
                                        <div className="block w-full mx-auto aspect-[4/3] rounded-md overflow-hidden relative mb-4">
                                            <Image
                                                src="/preview-panel.png"
                                                alt="Sertif Image"
                                                fill
                                                className="object-fill object-center"
                                                priority
                                            />
                                        </div>

                                        {/* Buttons Container */}
                                        <div className="flex flex-col sm:flex-row gap-3 py-4 pb-0 mb-0 border-t-2 border-border">
                                            <Button
                                                onClick={handleViewPDF}
                                                variant="outline"
                                                className="flex-1 sm:flex-none py-3 md:py-4 w-full sm:w-fit"
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Lihat Detail
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleDownloadPDF}
                                                className="flex-1 sm:flex-none py-3 md:py-4 w-full sm:w-fit"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download File
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
