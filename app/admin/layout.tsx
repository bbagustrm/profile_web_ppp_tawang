import React from "react";
import SidebarAdmin from "@/app/components/SidebarAdmin";

export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <div className="w-full flex">
            <div className="w-[20%]">
                <SidebarAdmin/>
            </div>
            <div className="w-[80%]">
                {children}
            </div>
        </div>

    )
}