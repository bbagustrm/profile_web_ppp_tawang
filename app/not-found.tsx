import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-4xl font-bold text-teal-600 mb-4">404</h1>
            <p className="text-lg text-gray-700 mb-6">
                Halaman tidak ditemukan.
            </p>
            <Link href="/">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Kembali ke Beranda
                </Button>
            </Link>
        </div>
    );
}
