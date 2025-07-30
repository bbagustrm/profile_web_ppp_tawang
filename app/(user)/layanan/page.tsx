'use client'

import { useState } from 'react'
import HeroSection2 from '../../components/HeroSection2'
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PersyaratanKapalKecilSection from "@/app/(user)/layanan/components/PersyaratanKapalKecilSection"
import PersyaratanKapalBesarSection from "@/app/(user)/layanan/components/PersyaratanKapalBesarSection"
import SPB from "@/app/(user)/layanan/components/SPB"

export default function LayananPage() {
    const [selectedLayanan, setSelectedLayanan] = useState("default")

    return (
        <div className="w-full relative min-h-screen bg-white">
            <Navbar />
            <HeroSection2
                title={"Layanan Kami"}
                image={'/layanan.jpeg'}
                description={"Pelayanan terbaik untuk kebutuhan masyarakat."}
            />
            <div className="container mx-auto pt-16 pb-8 px-8 md:px-0 text-[#163d4a]">
                <div className="flex justify-between md:items-center gap-12 flex-col md:flex-row">
                    <div className="flex items-start gap-4 ">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className="flex flex-col justify-center gap-4">
                            <h6>PERSYARATAN DOKUMEN</h6>
                            <h2>Pilih Layanan</h2>
                        </div>
                    </div>
                    <Select onValueChange={setSelectedLayanan}>
                        <SelectTrigger className="w-full md:w-96 rounded-lg bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <SelectValue placeholder="Pilih Layanan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="spb">SPB (Surat Persetujuan Berlayar)</SelectItem>
                            <SelectItem value="kapalkecil">Persyaratan Buku Kapal Perikanan Nelayan Kecil {"<"} 5 GT (E-BKP NK)</SelectItem>
                            <SelectItem value="kapalbesar">Persyaratan Dokumen Kapal Perikanan {">"} 5 GT</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <div className="container mx-auto pt-8 pb-16 px-8 md:px-0 text-[#163d4a]  min-h-screen">
                {/* Conditional Section */}
                {selectedLayanan === "default" && (
                    <div className="flex py-24 justify-center items-center ">
                        <p>Kamu belum memilih layanan</p>
                    </div>
                )}
                {selectedLayanan === "spb" && <SPB />}
                {selectedLayanan === "kapalkecil" && <PersyaratanKapalKecilSection />}
                {selectedLayanan === "kapalbesar" && <PersyaratanKapalBesarSection />}
            </div>
            <Footer />
        </div>
    )
}
