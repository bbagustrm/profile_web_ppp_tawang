import Image from "next/image";

export default function StrukturOrganisasiSection() {
    return (
        <div className="py-16 px-8 lg:px-16 xl:px-24 text-[#163d4a] ">
            <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
                    <h6>PPP TAWANG</h6>
                    <h2>Struktur Organisasi</h2>
                </div>
                <div className="w-full max-w-4xl relative aspect-[16/8]">
                    <Image
                        src="/struktur-organisasi.png"
                        alt="Alur SPB"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}