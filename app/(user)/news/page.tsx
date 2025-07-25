'use client'

import HeroSection2 from "@/app/components/HeroSection2";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Image from "next/image";

export default function NewsPage() {
    return (
        <div>
            <Navbar />
            <div className="relative min-h-screen">
                <HeroSection2
                    title={"Berita Terbaru"}
                    image={"/berita.png"}
                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut tellus dolor."}
                />
                <div className="container mx-auto py-16 px-8 text-[#163d4a]">
                    <div className="flex justify-between md:items-start gap-12 flex-col md:flex-row">
                        {/* Left Section */}
                        <div className="w-full md:w-[70%] flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input placeholder="Cari berita..." className="w-full" />
                                <Select defaultValue="terbaru">
                                    <SelectTrigger className="w-full md:w-1/4">
                                        <SelectValue placeholder="Urutkan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="terbaru">Terbaru</SelectItem>
                                        <SelectItem value="terlama">Terlama</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cards */}
                            <div className="flex flex-col gap-6 ">
                                {[1, 2, 3].map((item) => (
                                    <Card key={item} className="flex flex-col md:flex-row gap-2 text-[#163d4a]">
                                        <Image
                                            src="/hero.png"
                                            alt="image"
                                            width={280}
                                            height={200}
                                            className="w-full md:w-1/3 rounded-md object-cover"
                                        />
                                        <CardContent className="flex-1 w-full md:w-1/3 py-4 space-y-2">
                                            <h3 className="text-lg font-semibold">Judul Berita</h3>
                                            <p className="text-sm text-gray-500">24 Juli 2025</p>
                                            <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid amet atque blanditiis consectetur deserunt dignissimos, distinctio doloremque dolorum et eveniet iure libero magnam natus neque nostrum praesentium quod repudiandae sit suscipit veritatis voluptas. Aliquid animi cumque dolores magnam pariatur quasi quia repellat. Beatae laborum nemo neque porro!
                                            </p>
                                            <Button className='bg-teal-500' >Lihat Detail</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pt-8">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive>
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="hidden md:block md:w-[30%] space-y-6">
                            <h4 className="text-teal-600 font-bold mb-4">Berita Terkini</h4>

                            {[1, 2, 3].map((item) => (
                                <div key={item} className="mb-6 space-y-2">
                                    <p className="text-sm mb-1 text-teal-600 font-medium">4 Juli 2025 </p>
                                    <h3 className="text-base font-semibold text-gray-800 leading-snug">
                                        Lorem ipsum dolor sit amet, consectetur elit
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dui nunc...
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
