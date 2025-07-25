'use client'

import {
    Sidebar,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import clsx from "clsx"

export default function SidebarAdmin() {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClientComponentClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <Sidebar className="w-64 min-h-screen border-r flex flex-col justify-between text-[#163d4a]">
            {/* Sidebar Header */}
            <SidebarHeader className="py-6 px-4">
                <div className="flex flex-col items-center mb-10">
                    <Image src="/logo.png" alt="Logo" width={64} height={64} className="rounded-full" />
                    <div className="text-center mt-2">
                        <h1 className="text-sm font-semibold">PPP TAWANG</h1>
                        <p className="text-xs text-muted-foreground">KAB. KENDAL</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Sidebar Navigation */}
            <SidebarContent className="flex flex-col space-y-1 px-4">
                <Link
                    href="/admin"
                    className={clsx(
                        "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                        pathname === "/admin"
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                    )}
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin/berita-management"
                    className={clsx(
                        "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                        pathname === "/admin/berita-management"
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                    )}
                >
                    Berita Management
                </Link>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter className="mt-6 py-6 px-4">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
