'use client'

import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LokasiSection from "@/app/(user)/about/components/LokasiSection";
import MantulSection from "@/app/(user)/about/components/MantulSection";


export default function AboutPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"Profile"} image={"/hero.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut tellus dolor."}/>
                <LokasiSection/>
                <MantulSection/>
            </div>
            <Footer/>
        </>
    );
}