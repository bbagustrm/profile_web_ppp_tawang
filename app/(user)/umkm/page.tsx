import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ChevronRightIcon} from "lucide-react";

export default function UmkmPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"UMKM"} image={"/umkm.png"} description={"Dukung pertumbuhan UMKM lokal bersama kami."}/>
                <div className="container mx-auto mt-12 flex justify-center items-center px-4 text-[#163d4a] ]">
                    <Card className="w-full max-w-sm shadow-card rounded-md">
                        <CardHeader>
                            <CardTitle><h4>Link UMKM</h4></CardTitle>
                            <CardDescription><p className="text-sm">UMKM Tawang adalah pelaku usaha lokal pesisir Kendal yang mengolah hasil laut dan produk kreatif berbasis kearifan lokal dan potensi maritim.</p></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="https://linktr.ee/UMKM_Tawang">
                                <Button variant="secondary" size="icon" className="w-full py-4">
                                    <p className="text-sm">LinkTree UMKM</p>
                                    <ChevronRightIcon />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer/>
        </>
    );
}