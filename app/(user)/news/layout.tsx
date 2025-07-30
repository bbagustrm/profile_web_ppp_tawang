'use client'

import React, {useEffect, useState} from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSection2 from "@/app/components/HeroSection2";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Skeleton} from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";


interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}


export default function LayoutAuth({ children } : Readonly<{
    children: React.ReactNode;
}>){

    const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();

    // Fetch recent news for sidebar
    const fetchRecentNews = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("berita")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(5);

            if (error) {
                console.error('Error fetching recent news:', error);
                return;
            }

            setRecentNews(data || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchRecentNews();
    }, []);

    const RecentNewsSkeleton = () => (
        <div className="mb-6 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );

    return (
        <div className="w-full">
            <Navbar />
            <div className="relative min-h-screen ">
                <HeroSection2
                    title={"Berita Terbaru"}
                    image={"/berita.png"}
                    description={"Informasi terkini dan terpercaya dari kami."}
                />
                <div className="container mx-auto py-4 md:py-12 lg:py-16 md:px-8 text-[#163d4a]">
                    <div className="flex justify-between md:items-start gap-12 flex-col md:flex-row">
                        {children}
                        {/* Right Section */}
                        <div className="hidden ld::block lg:[30%] space-y-6 text-[#163d4a]">
                            <h4 className="text-teal-600 font-bold">Berita Terkini</h4>
                            <Separator orientation="horizontal" className="w-full"/>
                            {loading ? (
                                // Recent news skeletons
                                Array.from({ length: 5 }).map((_, index) => (
                                    <RecentNewsSkeleton key={index} />
                                ))
                            ) : (
                                recentNews.map((item) => (
                                    <Link href={`/news/${item.id}`} key={item.id}>
                                        <div className="space-y-2 cursor-pointer hover:bg-gray-100 p-4 transition-colors group">
                                            <h3 className="text-base font-semibold leading-snug group-hover:text-teal-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {stripHtml(item.content)}
                                            </p>
                                        </div>
                                        <Separator orientation="horizontal" className="w-full"/>
                                    </Link>

                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}