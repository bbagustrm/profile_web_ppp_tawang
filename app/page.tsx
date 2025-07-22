import HeroSection from "@/app/components/HeroSection";
import DenahSection from "@/app/components/DenahSection";
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
                <div className="container mx-auto py-16 px-8 lg:px-16 xl:px-24">
                    <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
                        <h6>SPOTLIGHT</h6>
                        <h2>Denah dan Lokasi</h2>
                    </div>
                    <DenahSection/>
                </div>
                <div className="container mx-auto py-16 px-8 lg:px-16 xl:px-24">
                    <div className="flex items-center gap-8 mb-12 md:mb-16">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className='flex flex-col gap-4'>
                            <h6>SPOTLIGHT</h6>
                            <h2>Denah dan Lokasi</h2>
                        </div>
                    </div>
                    <DenahSection/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
