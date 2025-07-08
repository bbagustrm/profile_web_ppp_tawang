
import Image from "next/image";
import {ArrowRight, MapPin} from "lucide-react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/hero.png"
                alt="Hero Image"
                fill
                priority
                className="object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-24 md:px-32 text-white space-y-4">
                <div className="space-x-2 flex items-center">
                    <MapPin size={24} className="md:w-7 md:h-7"/>
                    <h4>Kab. Kendal</h4>
                </div>
                <div className="explore">Explore</div>
                <h1>PPP Tawang</h1>
                <span className="space-y-3 md:space-y-5"></span>
                <Button className="button-default w-fit text-center justify-center md:justify-start">
                    <Link href="/about" className="flex items-center space-x-2">
                        <span>Jelajahi Program</span>
                        <ArrowRight size={20} className="md:w-6 md:h-6"/>
                    </Link>
                </Button>
            </div>
        </div>
    );
}