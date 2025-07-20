import BeritaForm from "../components/BeritaForm";
import Link from "next/link";

export default function CreateBeritaPage() {
    return (
        <div className="flex flex-col gap-8 p-8 w-full">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold">Tambah Berita</h3>
                    <p className="text-sm text-gray-500">Isi form di bawah untuk membuat berita baru</p>
                </div>
                <Link
                    href="/admin"
                    className="text-sm text-primary hover:underline"
                >
                    ← Kembali ke Daftar
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-border">
                <BeritaForm />
            </div>
        </div>
    );
}
