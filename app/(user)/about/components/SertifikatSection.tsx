import Image from "next/image";

export default function SertifikatSection() {
    return (
        <div className="container mx-auto py-16 px-8 lg:px-16 xl:px-24  text-[#163d4a]">
            <div className="flex justify-between md:items-center md:gap-12 lg:gap-24 flex-col md:flex-row">
                <div className=" hidden lg:block lg:basis-2/5 aspect-[4/3] rounded-md  overflow-hidden relative">
                    <Image
                        src="/sertif.png"
                        alt="Sertif Image"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
                <div className="w-full lg:basis-3/5 space-y-8 ">
                    <div className="flex items-start gap-4 ">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className="flex flex-col justify-center gap-4">
                            <h6>SERTIFIKAT</h6>
                            <h2>ISO 9001:2015</h2>
                        </div>
                    </div>
                    <p>
                        Dalam rangka meningkatkan mutu pelayanan dan menjamin kepuasan pengguna jasa, PPP Tawang telah menerapkan Sistem Manajemen Mutu berdasarkan standar ISO 9001:2015. Penerapan standar ini mencakup berbagai layanan utama, di antaranya:
                    </p>
                    <div className="space-y-2">
                        <div className="flex gap-4">
                            <p>1.</p>
                            <p>Pelayanan e-SLO (Elektronik Surat Laik Operasi)</p>
                        </div>
                        <div className="flex gap-4">
                            <p>2.</p>
                            <p>Pelayanan Persetujuan Berlayar</p>
                        </div>
                        <div className="flex gap-4">
                            <p>3.</p>
                            <p>Pelayanan STBLK (Surat Tanda Bukti Lapor Kedatangan)</p>
                        </div>
                        <div className="flex gap-4">
                            <p>4.</p>
                            <p>Retribusi Pas Masuk</p>
                        </div>
                        <div className="flex gap-4">
                            <p>5.</p>
                            <p>Penerbitan P2KP (Persetujuan Pengadaan Kapal Perikanan)</p>
                        </div>
                        <div className="flex gap-4">
                            <p>6.</p>
                            <p>Surat Masuk</p>
                        </div>
                        <div className="flex gap-4">
                            <p>7.</p>
                            <p>Surat Keluar</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}