import Image from "next/image";
import {ArrowRight, MapPin} from "lucide-react";
import { Button } from "@radix-ui/themes";

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
            <div className="absolute inset-0 flex flex-col justify-center px-32 text-white space-y-4">
                <div className="space-x-2 flex items-center">
                    <MapPin size={28}/>
                    <h4>Kab. Kendal</h4>
                </div>
                <div className="explore">Explore</div>
                <h1>PPP Tawang</h1>
                <span className="space-y-5"></span>
                <Button className="button-default ">
                    Explore
                    <ArrowRight size={24}/>
                </Button>

            </div>
        </div>

    );
}