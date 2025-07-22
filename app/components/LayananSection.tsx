import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LayananSection() {
    return (
        <div className="w-full h-[560px] md:h-[480px] relative">
            <Image
                src="/layanansection.png"
                alt="Gambar"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 z-10 px-8 lg:px-16 xl:px-24 container mx-auto flex justify-between items-center gap-12">
                <div className="w-full lg:w-[60%] text-white space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className="flex flex-col justify-center gap-4">
                            <h6>PELAYANAN DAN PERIZINAN</h6>
                            <h2>Layanan Kami</h2>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Pelayanan jasa di PPP Tawang meliputi kegiatan keluar masuk kapal perikanan, pelayanan tambat dan labuh kapal perikanan, bongkar muat dan pelelangan ikan, pembinaan dan pengawasan mutu hasil perikanan, pemantauan dan pengendalian penangkapan ikan, serta koordinasi pembinaan nelayan. Selain itu juga terdapat layanan kebersihan, keindahan, keamanan, ketertiban, dan kenyamanan (K5), pengelolaan sistem informasi pelabuhan perikanan, pelayanan kesyahbandaran perikanan, serta pelayanan sewa lahan. Sementara itu, layanan perizinan dan pembuatan dokumen juga kami sediakan.
                    </p>
                    <Link href="/layanan">
                        <Button variant="secondary" className="mt-8 px-4 font-semibold">
                            Lihat Detail
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>

                {/* Gambar Layanan */}
                <div className="hidden md:block w-[400px] h-[300px] rounded-lg overflow-hidden border-2 border-border relative">
                    <Image
                        src="/Layanan.jpeg"
                        alt="Layanan Image"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
