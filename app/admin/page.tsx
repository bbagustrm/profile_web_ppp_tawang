'use client'

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

interface Berita {
    id: string;
    title: string;
    content: string;
    image_path?: string | null;
    created_at: string;
}

export default function BeritaList() {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();

    useEffect(() => {
        const fetchBerita = async () => {
            const { data, error } = await supabase
                .from("berita")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Gagal fetch berita:", error.message);
            } else {
                setBerita(data || []);
            }

            setLoading(false);
        };

        fetchBerita();
    }, [supabase]);

    if (loading) return <p>Loading berita...</p>;

    return (
        <div className="space-y-6">
            {berita.length === 0 && <p>Tidak ada berita.</p>}
            {berita.map((item) => (
                <div
                    key={item.id}
                    className="bg-white border border-border rounded-lg overflow-hidden shadow-sm flex flex-col sm:flex-row"
                >
                    {/* Gambar */}
                    <div className="sm:w-1/3 w-full h-60 relative">
                        <Image
                            src={item.image_path || "/default-image.jpg"}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            className="sm:rounded-l-lg"
                        />
                    </div>

                    {/* Konten */}
                    <div className="flex-1 p-4 space-y-2 relative">
                        {/* Tombol kanan atas */}
                        <div className="absolute top-4 right-4 space-x-2 text-sm text-primary font-semibold">
                            <button className="hover:underline">Edit</button>
                            <button className="text-red-500 hover:underline">Delete</button>
                        </div>

                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <p className="text-xs text-gray-400">
                            {new Date(item.created_at).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <p className="text-sm text-gray-600">
                            {item.content.length > 200
                                ? item.content.slice(0, 200) + "..."
                                : item.content}
                            <span className="font-semibold text-black"> Read More</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
