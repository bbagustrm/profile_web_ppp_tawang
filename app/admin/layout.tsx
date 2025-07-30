import React from "react";
import SidebarAdmin from "./components/SidebarAdmin";
import { SidebarProvider} from "@/components/ui/sidebar"


export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <SidebarProvider>
            <div className="w-full flex  ">
                <SidebarAdmin />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}