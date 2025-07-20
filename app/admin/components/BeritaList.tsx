'use client'

import { useState } from "react"

interface Berita {
    id: number
    judul: string
    isi: string
}

export default function BeritaList() {
    const [beritaList, setBeritaList] = useState<Berita[]>([
        { id: 1, judul: "Contoh Berita 1", isi: "Ini isi berita 1" },
        { id: 2, judul: "Contoh Berita 2", isi: "Ini isi berita 2" },
    ])

    const handleDelete = (id: number) => {
        if (confirm("Yakin ingin menghapus berita ini?")) {
            setBeritaList((prev) => prev.filter((b) => b.id !== id))
        }
    }

    return (
        <div className="space-y-4">
            {beritaList.map((berita) => (
                <div
                    key={berita.id}
                    className="border border-border rounded-md p-4 bg-gray-50 flex justify-between items-start"
                >
                    <div>
                        <h5 className="text-md font-semibold">{berita.judul}</h5>
                        <p className="text-sm text-gray-600 mt-1">{berita.isi}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(berita.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                        Hapus
                    </button>
                </div>
            ))}
        </div>
    )
}
