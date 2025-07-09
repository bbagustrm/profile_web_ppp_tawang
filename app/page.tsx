import HeroSection from "@/app/components/HeroSection";
import DenahSection from "@/app/components/DenahSection";
import BeritaSection from "@/app/components/BeritaSection";
import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {Button} from "@radix-ui/themes";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection/>
                <div className="container mx-auto py-24 px-8 lg:px-16 xl:px-24">
                    <div className="flex flex-col md:items-center gap-4 mb-12 md:mb-16">
                        <h6>Spotlight</h6>
                        <h2>Denah dan Lokasi</h2>
                    </div>
                    <DenahSection/>
                </div>
                <div className="relative w-full h-[500px] md:h-[400px] lg:h-[300px] ">
                    <Image
                        src="/hero.png"
                        alt="Hero Image"
                        fill
                        priority
                        className="object-cover brightness-50"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 text-white space-y-4">
                        <h6>Program Berkelanjutan</h6>
                        <h3 className="font-serif">Model Desain Koridor Komersial di Pelabuhan Ikan Tawang Guna Meningkatkan Market Organisasi Warga Nelayan Sebagai Pusat Wisata Belanja Bahari</h3>
                        <span className="space-y-5"></span>
                        <Button className="button-default ">
                            <Link href="/koridor">Jelajahi Program</Link>
                            <ArrowRight size={24}/>
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto py-24 px-8 lg:px-16 xl:px-24">
                    <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between     md:gap-24">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <h6>Festival & Event</h6>
                            <h2>Berita Terbaru</h2>
                        </div>
                        <Button className="button-bordered h-fit">
                            <Link href="/news">Lihat Berita Terbaru</Link>
                            <ArrowRight size={24}/>
                        </Button>
                    </div>
                    <BeritaSection/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
