import React from "react";
import SidebarAdmin from "./components/SidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <SidebarProvider>
            <div className="w-full flex bg-gray-100 gap-8">
                <div className="flex">
                    <SidebarAdmin />
                    <SidebarTrigger />
                </div>

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}