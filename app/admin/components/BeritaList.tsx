'use client'

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Pencil,
    Trash2,
    Plus,
    MoreHorizontal,
    FileText,
    Calendar,
    Image as ImageIcon
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    }, []);

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Berita</p>
                                <p className="text-3xl font-bold">{berita.length}</p>
                            </div>
                            <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                                <FileText className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-100 text-sm font-medium">Bulan Ini</p>
                                <p className="text-3xl font-bold">
                                    {berita.filter(item => {
                                        const itemDate = new Date(item.created_at);
                                        const currentDate = new Date();
                                        return itemDate.getMonth() === currentDate.getMonth() &&
                                            itemDate.getFullYear() === currentDate.getFullYear();
                                    }).length}
                                </p>
                            </div>
                            <div className="p-3 bg-teal-400 bg-opacity-30 rounded-full">
                                <Calendar className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <p className="text-yellow-100 text-sm font-medium">Terakhir Update</p>
                                <p className="text-lg font-bold">
                                    {berita.length > 0
                                        ? new Date(berita[0].created_at).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                        : "Belum ada data"
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-400 bg-opacity-30 rounded-full">
                                <Calendar className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Management Card */}
            <Card className="shadow-lg border-0 bg-white text-[#163d4a]">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold text-[#163d4a]">
                                Manajemen Berita
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                                Kelola dan pantau semua konten berita
                            </CardDescription>
                        </div>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-md">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Berita
                        </Button>
                    </div>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                    {/* Table Content */}
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <Card key={i} className="p-4 border border-slate-100">
                                    <div className="flex gap-4 items-center">
                                        <Skeleton className="h-16 w-16 rounded-lg" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Skeleton className="h-8 w-16" />
                                            <Skeleton className="h-8 w-16" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : berita.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-[#163d4a] mb-2">
                                Belum ada berita
                            </h3>
                            <p className="text-slate-500 mb-6">
                                Mulai dengan menambahkan berita pertama Anda
                            </p>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Berita Pertama
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-slate-200">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow className="hover:bg-slate-50">
                                        <TableHead className="w-20 font-semibold text-slate-700">Gambar</TableHead>
                                        <TableHead className="font-semibold text-slate-700">Judul</TableHead>
                                        <TableHead className="font-semibold text-slate-700">Deskripsi</TableHead>
                                        <TableHead className="whitespace-nowrap font-semibold text-slate-700">Tanggal Dibuat</TableHead>
                                        <TableHead className="text-center font-semibold text-slate-700">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {berita.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className="hover:bg-slate-50 transition-colors duration-150"
                                        >
                                            <TableCell className="p-4">
                                                {item.image_path ? (
                                                    <div className="relative">
                                                        <Image
                                                            src={item.image_path}
                                                            alt={item.title}
                                                            width={64}
                                                            height={64}
                                                            className="rounded-lg object-cover shadow-sm border border-slate-200"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                                        <ImageIcon className="h-6 w-6 text-slate-400" />
                                                    </div>
                                                )}
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <div className="space-y-1">
                                                    <p className="font-semibold text-[#163d4a] leading-tight truncate">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        ID: {item.id.slice(0, 8)}...
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="p-4 max-w-md">
                                                <p className="text-sm text-slate-600 leading-relaxed truncate">
                                                    {item.content}
                                                </p>
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-[#163d4a]">
                                                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {new Date(item.created_at).toLocaleTimeString("id-ID", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-slate-200 hover:bg-slate-50"
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Pencil className="w-4 h-4 mr-2" />
                                                                Edit Berita
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Hapus Berita
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination info */}
                    {berita.length > 0 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                            <p className="text-sm text-slate-600">
                                Menampilkan {berita.length} berita
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}