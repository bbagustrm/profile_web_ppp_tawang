import HeroSection from "@/app/components/HeroSection";
import DenahSection from "@/app/components/DenahSection";
import BeritaSection from "@/app/components/BeritaSection";
import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {Button} from "@radix-ui/themes";

export default function HomePage() {
    return (
        <div className="relative min-h-screen">
            <HeroSection/>
            <div className="container mx-auto px-4 py-24 space-y-16">
                <div className="flex flex-col items-center gap-4">
                    <h6>Spotlight</h6>
                    <h2>Denah dan Lokasi</h2>
                </div>
                <DenahSection/>
            </div>
            <div className="relative w-full h-[300px]">
                <Image
                    src="/hero.png"
                    alt="Hero Image"
                    fill
                    priority
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-32 text-white space-y-4">
                    <h4>Program Berkelanjutan</h4>
                    <h2>Model Design 3D Koridor</h2>
                    <span className="space-y-5"></span>
                    <Button className="button-default ">
                        Jelajahi Program
                        <ArrowRight size={24}/>
                    </Button>
                </div>
            </div>
            <div className="container mx-auto px-4 py-24 space-y-16">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <h6>Festival & Event</h6>
                        <h2>Berita Terbaru</h2>
                    </div>
                    <Button className="button-bordered h-fit">
                        Lihat Berita Lainnya
                        <ArrowRight size={24}/>
                    </Button>
                </div>
                <BeritaSection/>
            </div>
        </div>
    );
}
