import Image from "next/image";
import Link from "next/link";

export default function NavbarAuth() {
    return (
        <div className="w-full fixed top-0 px-4 py-3 left-0 z-50 transition-all duration-300 bg-white  shadow-md text-[#163d4a]">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full" />
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </Link>

            </div>
        </div>
    )
}