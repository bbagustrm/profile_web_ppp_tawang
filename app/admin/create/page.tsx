'use client'

import BeritaForm from "../components/BeritaForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CreateBeritaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/admin" className="flex items-center space-x-4">
                            <div className="p-2 ">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-[#163d4a]">Tambah Berita Baru</h4>
                            </div>
                        </Link>
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
                    <span className="text-[#163d4a] font-medium">Create Berita</span>
                </div>



                {/* Form Card */}
                <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-[#163d4a]">
                            Form Berita Baru
                        </CardTitle>
                    </CardHeader>
                    <Separator />

                    <CardContent className="p-6">
                        <BeritaForm />
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Setelah berita dibuat, Anda dapat mengedit atau menghapusnya dari dashboard admin
                    </p>
                </div>
            </div>
        </div>
    );
}