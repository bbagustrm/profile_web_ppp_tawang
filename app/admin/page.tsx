'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BeritaList from "./components/BeritaList";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h4 className="text-[#163d4a]">Admin Dashboard</h4>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src="/api/placeholder/32/32" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BeritaList />
            </div>
        </div>
    );
}