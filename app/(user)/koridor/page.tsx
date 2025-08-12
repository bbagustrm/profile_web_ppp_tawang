import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function koridorPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"Design 3D"} image={"/koridor.jpg"} description={"Program KKN IDBU-83 Universitas Diponegoro"}/>
                <div className="container mx-auto mt-12 flex justify-center items-center px-4 text-[#163d4a] ]">
                    isi disini
                </div>
            </div>
            <Footer/>
        </>
    );
}