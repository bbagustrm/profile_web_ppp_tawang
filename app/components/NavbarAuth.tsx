import Image from "next/image";

export default function NavbarAuth() {
    return (
        <div className="w-full sticky top-0 px-4 py-3 left-0 z-50 transition-all duration-300 bg-white text-primary shadow-md">
            <div className="container w-full mx-auto flex justify-between items-center">
                <div className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full"/>
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </div>

            </div>
        </div>
    )
}