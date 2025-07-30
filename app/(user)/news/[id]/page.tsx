'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import {toast} from "sonner";

interface Berita {
    id: string;
    title: string;
    content: string;
    image_path: string;
    created_at: string;
}

export default function NewsDetailPage() {
    const [news, setNews] = useState<Berita | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const router = useRouter();
    const supabase = createClientComponentClient();

    // Format date function
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Format time function
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        });
    };

    // Function to parse HTML content safely
    const createMarkup = (htmlContent: string) => {
        return { __html: htmlContent };
    };

    // Fetch news detail
    const fetchNewsDetail = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('berita')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching news detail:', error);
                setError('Berita tidak ditemukan');
                return;
            }

            if (!data) {
                setError('Berita tidak ditemukan');
                return;
            }

            setNews(data);
        } catch (error) {
            console.error('Error:', error);
            setError('Terjadi kesalahan saat memuat berita');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (params.id) {
            fetchNewsDetail(params.id as string);
        }
    }, [params.id]);

    // Handle back navigation
    const handleBack = () => {
        router.back();
    };

    // Loading skeleton components
    const DetailSkeleton = () => (
        <div className="w-full md:w-[70%] space-y-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                {/* Title Skeleton */}
                <div className="p-6 pb-4 space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                </div>

                {/* Date Skeleton */}
                <div className="px-6 pb-4">
                    <Skeleton className="h-6 w-48" />
                </div>

                {/* Image Skeleton */}
                <div className="px-6 pb-6">
                    <Skeleton className="h-64 md:h-80 w-full rounded-lg" />
                </div>

                {/* Content Skeleton */}
                <div className="px-6 pb-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );

    // Error state
    if (error) {
        return (
            <div className="w-full md:w-[70%] flex flex-col items-center justify-center py-16">
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Oops! Berita Tidak Ditemukan</h2>
                    <p className="text-gray-600">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <Button onClick={handleBack} variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                        <Button onClick={() => router.push('/news')} className="bg-teal-500 hover:bg-teal-600">
                            Lihat Berita Lain
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return <DetailSkeleton />;
    }

    // Main content
    return (
        <div className="w-full lg:w-[70%] space-y-6">
            <Button
                onClick={handleBack}
                variant="outline"
                className="md:hidden ml-4 mb-8 flex items-center justify-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali
            </Button>

            <div className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden ">
                {/* Image */}
                {news?.image_path && (
                    <div className="">
                        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden shadow-md">
                            <Image
                                src={news.image_path}
                                alt={news.title}
                                fill
                                className="object-cover"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/hero.png";
                                }}
                            />
                        </div>
                    </div>
                )}
                {/* Title */}
                <div className="p-6 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#163d4a] leading-tight">
                        {news?.title}
                    </h1>
                </div>

                {/* Date and Time Info */}
                <div className="px-6 pb-4">
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 border-l-4 border-teal-500 pl-4 bg-gray-50 py-3 rounded-r-lg">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span className="font-medium">
                                {news?.created_at && formatDate(news.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span>
                                {news?.created_at && formatTime(news.created_at)} WIB
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-700 leading-relaxed space-y-4 text-justify"
                            dangerouslySetInnerHTML={createMarkup(news?.content || '')}
                            style={{
                                lineHeight: '1.8',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex px-8 md:px-0 flex-col md:flex-row justify-between pt-8 gap-4 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-4">
                    <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                    <Button
                        onClick={() => router.push('/news')}
                        className="bg-teal-500 hover:bg-teal-600 flex items-center justify-center gap-2"
                    >
                        Lihat Berita Lainnya
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            const url = window.location.href;
                            const text = `Baca berita: ${news?.title}`;
                            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                            window.open(whatsappUrl, '_blank');
                        }}
                        className="text-green-600 hover:bg-green-50"
                    >
                        WhatsApp
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            // You can add a toast notification here
                            toast('Link berhasil disalin!');
                        }}
                        className="text-blue-600 hover:bg-blue-50"
                    >
                        Salin Link
                    </Button>
                </div>
            </div>

        </div>
    );
}