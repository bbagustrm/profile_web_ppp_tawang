'use client'

import React, { useState } from "react"

export default function BeritaForm() {
    const [judul, setJudul] = useState('')
    const [isi, setIsi] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Kirim data ke Supabase
        alert(`Berita dikirim:\nJudul: ${judul}\nIsi: ${isi}`)
        setJudul('')
        setIsi('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Judul Berita</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Isi Berita</label>
                <textarea
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    rows={4}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
            >
                Tambah
            </button>
        </form>
    )
}
