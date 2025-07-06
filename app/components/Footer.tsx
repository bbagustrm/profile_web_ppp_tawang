import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-primary text-white">
            <div className="container mx-auto flex flex-row justify-between gap-8 py-12">
                <div className="flex-2 flex flex-col gap-4">
                    <Image src="/logo.png" alt="logo" width={100} height={100} className="rounded-full"/>
                    <h3>PPP Tawang</h3>
                    <p>Gempolsewu, Rowosari, Kec. Kendal, Jawa Tengah</p>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h4>Content</h4>
                    <div className="flex flex-col gap-2 text-variant">
                        <Link href="/"><p className="hover:text-white">Denah dan Lokasi</p></Link>
                        <Link href="/"><p className="hover:text-white">Program Berkelanjutan</p></Link>
                        <Link href="/news"><p className="hover:text-white">Berita Terbaru</p></Link>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h4>About</h4>
                    <div className="flex flex-col gap-2 text-variant">
                        <Link href="/about"><p className="hover:text-white">Lokasi</p></Link>
                        <Link href="/about"><p className="hover:text-white">Visi dan Misi</p></Link>
                        <Link href="/about"><p className="hover:text-white">Tugas Pokok</p></Link>
                        <Link href="/about"><p className="hover:text-white">Fungsi</p></Link>
                        <Link href="/about"><p className="hover:text-white">Fasilitas</p></Link>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h4>Lokasi</h4>
                    <Image src="/map0.png" alt="logo" width={400} height={300}/>
                </div>
            </div>
        </div>
    )
}