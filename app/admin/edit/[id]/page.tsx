'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import BeritaForm from "../../components/BeritaForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EditBeritaPage() {
    const { id } = useParams();
    const supabase = createClientComponentClient();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBerita = async () => {
            const { data, error } = await supabase
                .from("berita")
                .select("*")
                .eq("id", id)
                .single();

            if (!error && data) {
                setBerita(data);
            }
            setLoading(false);
        };

        if (id) fetchBerita();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/admin">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                            <h4 className="text-[#163d4a]">Edit Berita</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
                    <Link href="/admin" className="hover:text-teal-600 transition-colors">
                        Dashboard
                    </Link>
                    <span>/</span>
                    <span className="text-[#163d4a] font-medium">Edit Berita</span>
                </div>

                {/* Form Card */}
                <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-[#163d4a]">
                            Form Edit Berita
                        </CardTitle>
                    </CardHeader>
                    <Separator />

                    <CardContent className="p-6">
                        {loading ? (
                            <p>Memuat data berita...</p>
                        ) : (
                            berita && <BeritaForm berita={berita} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
