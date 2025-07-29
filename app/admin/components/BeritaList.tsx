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
    Image as ImageIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const beritaPerPage = 10;

    const filteredBerita = berita.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const beritaTampil = filteredBerita.slice(
        (currentPage - 1) * beritaPerPage,
        currentPage * beritaPerPage
    );

    const totalPages = Math.ceil(filteredBerita.length / beritaPerPage);


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

    const hapusBerita = async (id: string, imagePath: string | null | undefined) => {
        const konfirmasi = confirm("Yakin ingin menghapus berita ini?");
        if (!konfirmasi) return;

        const { error: deleteError } = await supabase.from("berita").delete().eq("id", id);

        if (deleteError) {
            console.error("Gagal menghapus berita:", deleteError.message);
            alert("Gagal menghapus berita.");
            return;
        }

        // Ekstrak relative path dari imagePath (hapus domain dan prefix)
        if (imagePath) {
            const relativePath = imagePath.split("/").slice(-1)[0];
            console.log(relativePath);
            const { error: storageError } = await supabase
                .storage
                .from("news-images")
                .remove(['1753730024606-8z1hd8lrtjg.png']);


            if (storageError) {
                console.error("Gagal menghapus gambar:", storageError.message);
            }
        }

        setBerita((prev) => prev.filter((item) => item.id !== id));
        alert("Berita berhasil dihapus.");
    };


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
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold text-[#163d4a]">
                                Manajemen Berita
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Kelola dan pantau semua konten berita
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6">
                            <input
                                type="text"
                                placeholder="Cari judul berita..."
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-64"
                                value={searchQuery}
                                onChange={(e) => {
                                    setCurrentPage(1); // reset ke halaman awal saat pencarian berubah
                                    setSearchQuery(e.target.value);
                                }}
                            />
                            <Link href='/admin/create' className='flex items-center'>
                                <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Berita
                                </Button>
                            </Link>
                        </div>

                    </div>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                    {/* Table Content */}
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <Card key={i} className="p-4 border border-gray-100">
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
                        <div className="flex flex-col items-center text-center py-12">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-[#163d4a] mb-2">
                                Belum ada berita
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Mulai dengan menambahkan berita pertama Anda
                            </p>
                            <Link href='/admin/create' className='flex items-center'>
                                <Button className="bg-teal-600 hover:bg-teal-500 text-white shadow-md">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Berita
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow className="hover:bg-gray-50">
                                        <TableHead className="w-20 font-semibold text-gray-700"> </TableHead>
                                        <TableHead className="font-semibold text-gray-700">Judul</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Deskripsi</TableHead>
                                        <TableHead className="whitespace-nowrap font-semibold text-gray-700">Tanggal Dibuat</TableHead>
                                        <TableHead className="text-center font-semibold text-gray-700">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {beritaTampil.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <TableCell className="p-4">
                                                {item.image_path ? (
                                                    <div className="relative">
                                                        <Image
                                                            src={item.image_path}
                                                            alt={item.title}
                                                            width={64}
                                                            height={64}
                                                            className="rounded-lg aspect-square object-cover shadow-sm border border-gray-200"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <div className="space-y-1 max-w-48">
                                                    <p className="font-semibold text-[#163d4a] leading-tight truncate">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ID: {item.id.slice(0, 8)}...
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 max-w-72">
                                                    {item.content}
                                                </p>
                                            </TableCell>

                                            <TableCell className="p-4">
                                                <div className="text-sm">
                                                    <h6 className="font-normal text-[#163d4a]">
                                                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                        -
                                                        {new Date(item.created_at).toLocaleTimeString("id-ID", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </h6>
                                                    <p className="text-xs text-gray-500">

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
                                                                className="border-gray-200 hover:bg-gray-50"
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Link href={`/admin/edit/${item.id}`} className={'flex gap-2'}>
                                                                    <Pencil className="w-4 h-4 mr-2" />
                                                                    Edit Berita
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600"
                                                                onClick={() => hapusBerita(item.id, item.image_path)}
                                                            >
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

                    {/*pagination*/}
                    {filteredBerita.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 w-full">
                                Menampilkan {(currentPage - 1) * beritaPerPage + 1} -{" "}
                                {Math.min(currentPage * beritaPerPage, filteredBerita.length)} dari {filteredBerita.length} berita
                            </p>

                            <Pagination className="w-fit">
                                <PaginationContent>

                                    {/* Tombol Previous */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            className={currentPage === 1 ? "opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {/* Angka Halaman */}
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <button
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-3 py-1 text-sm rounded-md border transition ${
                                                    currentPage === i + 1
                                                        ? "bg-teal-600 text-white border-teal-600"
                                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        </PaginationItem>
                                    ))}

                                    {/* Tombol Next */}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            className={currentPage === totalPages ? "opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}