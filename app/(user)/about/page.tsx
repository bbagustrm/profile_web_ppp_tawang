'use client'

import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LokasiSection from "@/app/(user)/about/components/LokasiSection";
import MantulSection from "@/app/(user)/about/components/MantulSection";
import VisiMisiSection from "@/app/(user)/about/components/VisiMisi";
import SertifikatSection from "@/app/(user)/about/components/SertifikatSection";
import PelayananJasaSection  from "@/app/(user)/about/components/PelayananJasaSection";
import StrukturOrganisasiSection from "@/app/(user)/about/components/StrukturOrganisasiSection";
import SaranaPrasaranaSection from "@/app/(user)/about/components/SaranaPrasaranaSection";


export default function AboutPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"Profile"} image={"/hero.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut tellus dolor."}/>
                <LokasiSection/>
                <MantulSection/>
                <VisiMisiSection/>
                <SertifikatSection/>
                <PelayananJasaSection/>
                <StrukturOrganisasiSection/>
                <SaranaPrasaranaSection/>
            </div>
            <Footer/>
        </>
    );
}