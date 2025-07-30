'use client'

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_path: string;
    created_at: string;
}

interface PaginationInfo {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PaginationInfo>({
        total: 0,
        totalPages: 0,
        currentPage: 1,
        hasNext: false,
        hasPrev: false
    });

    const itemsPerPage = 6;
    const supabase = createClientComponentClient();

    // Format date function
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Fetch news with search, filter, and pagination
    const fetchNews = async (page: number = 1, search: string = '', sort: string = 'terbaru') => {
        setLoading(true);
        try {
            let query = supabase
                .from('berita')
                .select('*', { count: 'exact' });

            // Apply search filter
            if (search.trim()) {
                query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
            }

            // Apply sorting
            if (sort === 'terbaru') {
                query = query.order('created_at', { ascending: false });
            } else {
                query = query.order('created_at', { ascending: true });
            }

            // Apply pagination
            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) {
                console.error('Error fetching news:', error);
                return;
            }

            setNews(data || []);

            // Update pagination info
            const totalPages = Math.ceil((count || 0) / itemsPerPage);
            setPagination({
                total: count || 0,
                totalPages,
                currentPage: page,
                hasNext: page < totalPages,
                hasPrev: page > 1
            });

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchNews(1, searchTerm, sortOrder);
    }, []);

    // Handle search
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
        fetchNews(1, value, sortOrder);
    };

    // Handle sort change
    const handleSortChange = (value: 'terbaru' | 'terlama') => {
        setSortOrder(value);
        setCurrentPage(1);
        fetchNews(1, searchTerm, value);
    };

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchNews(page, searchTerm, sortOrder);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate pagination numbers
    const generatePaginationNumbers = () => {
        const { currentPage, totalPages } = pagination;
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="w-full md:w-[70%] flex flex-col gap-12">
            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Input
                    placeholder="Cari berita..."
                    className="w-full md:w-1/2 bg-white"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Select value={sortOrder} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-1/6 bg-white">
                        <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="terbaru"><p className="font-normal text-sm">Terbaru</p></SelectItem>
                        <SelectItem value="terlama"><p className="font-normal text-sm">Terlama</p></SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="flex flex-col gap-2">
                            <Skeleton className="w-full h-48 rounded-t-md" />
                            <CardContent className="py-4 px-4 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-10 w-24 mt-4" />
                            </CardContent>
                        </Card>
                    ))
                ) : news.length > 0 ? (
                    // News cards
                    news.map((item) => (
                        <Link href={`/news/${item.id}`} key={item.id}>
                            <Card className="group text-[#163d4a] shadow-card hover:shadow-md rounded-sm transition-shadow flex flex-col cursor-pointer overflow-hidden">
                                <Image
                                    src={item.image_path || "/hero.png"}
                                    alt={item.title}
                                    width={400}
                                    height={240}
                                    className="w-full h-36 object-cover rounded-t-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <CardContent className="py-4 px-4 space-y-2">
                                    <h3 className="text-lg font-semibold group-hover:text-teal-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {formatDate(item.created_at)}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                                        {stripHtml(item.content)}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    // No results
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchTerm
                                ? `Tidak ditemukan berita dengan kata kunci "${searchTerm}"`
                                : "Belum ada berita tersedia"}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="pt-8">
                    <Pagination>
                        <PaginationContent>
                            {pagination.hasPrev && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                    />
                                </PaginationItem>
                            )}

                            {generatePaginationNumbers().map((page, index) => (
                                <PaginationItem key={index}>
                                    {page === "ellipsis" ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            href="#"
                                            isActive={page === currentPage}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page as number);
                                            }}
                                            className={`transition-colors  ${
                                                page === currentPage
                                                    ? "bg-teal-600 text-white hover:text-white hover:bg-teal-500"
                                                    : "bg-white text-gray-700 "
                                            }`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            {pagination.hasNext && (
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );

}