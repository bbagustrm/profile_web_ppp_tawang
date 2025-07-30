import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function UmkmPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"UMKM"} image={"/umkm.png"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut tellus dolor."}/>
                <div className="container h-96 mx-auto px-4 flex justify-center items-center">
                    <p>Konten Segera Hadir!</p>
                </div>
            </div>
            <Footer/>
        </>
    );
}