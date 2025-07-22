import HeroSection from "@/app/components/HeroSection";
import DenahSection from "@/app/components/DenahSection";
import BeritaSection from "@/app/components/BeritaSection";
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
                    <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
                        <h6>SPOTLIGHT</h6>
                        <h2>Denah dan Lokasi</h2>
                    </div>
                    <DenahSection/>
                </div>
                <div className="container mx-auto py-24 px-8 lg:px-16 xl:px-24">
                    <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between     md:gap-24">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <h6>FESTIVAL & EVENTS</h6>
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
