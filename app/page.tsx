import HeroSection from "@/app/components/HeroSection";
import DenahSection from "@/app/components/DenahSection";
import LayananSection from "@/app/components/LayananSection";
import AboutSection from "@/app/components/AboutSection";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection/>
                <DenahSection/>
                <LayananSection/>
                <AboutSection/>
            </div>
            <Footer/>
        </div>
    );
}
