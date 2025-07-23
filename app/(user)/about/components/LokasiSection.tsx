import Image from "next/image";
import {Phone} from "phosphor-react";

export default function LokasiSection() {
    return (
        <div className="w-full py-16 px-8 lg:px-16 xl:px-24 bg-white text-[#163d4a]">
            <div className="flex justify-between md:items-center md:gap-12 lg:gap-24 flex-col md:flex-row">
                <div className=" hidden lg:block lg:basis-1/4 aspect-square rounded-full border-2 border-border overflow-hidden relative">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
                <div className="w-full lg:basis-3/4 space-y-8 ">
                    <div className="flex items-start gap-4 ">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className="flex flex-col justify-center gap-4">
                            <h6>ADMINISTRATIF</h6>
                            <h2>Lokasi</h2>
                        </div>
                    </div>
                    <p>
                        Pelabuhan Perikanan Pantai Tawang terletak di Dukuh Tawang, Desa Gempolsewu, Kecamatan Rowosari, Kabupaten Kendal, sekitar 26 km dari pusat kota, dan termasuk kawasan pengembangan perikanan tangkap serta industri berbasis kelautan. Berdasarkan Perda No. 25 Tahun 2007, wilayah ini masuk dalam Wilayah Pengembangan Perikanan III, dengan cakupan perairan Pantai Utara Jawa sepanjang ±42,2 km di tujuh kecamatan, termasuk Rowosari.
                    </p>
                    <p>
                        Alamat: Komplek TPI Tawang, Gempolsewu, Kec. Rowosari, Kab. kendal
                    </p>
                    <div className='flex gap-4'>
                        <div className="flex items-center gap-3">
                            <Phone size={20} weight='fill' className={'text-teal-500'}/>
                            <p>(0294)3645668</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={20} weight='fill' className={'text-teal-500'}/>
                            <p>(0294)3645669</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}