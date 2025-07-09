import React from "react";
import NavbarAuth from "@/app/components/NavbarAuth";

export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <div>
            <NavbarAuth/>
            {children}
        </div>
    )
}