import HeroSection2 from "@/app/components/HeroSection2";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {ChevronRightIcon} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function PengaduanPage() {
    return (
        <>
            <Navbar/>
            <div className="relative min-h-screen">
                <HeroSection2 title={"Pengaduan"} description={"Pengaduan dan Aspirasi Berbasis Digital"}/>
                <div className="container mx-auto mt-12 flex justify-center items-center px-4">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle><h4>Link Pengaduan</h4></CardTitle>
                            <CardDescription><p>Sampaikan keluhan, masukan, dan aspirasi Anda kepada PPP Tawang.</p></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="https://bit.ly/PengaduanPelabuhanTawang">
                                <Button variant="outline" size="icon" className="size-8 w-full py-6">
                                    <p>Link Pengaduan</p>
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