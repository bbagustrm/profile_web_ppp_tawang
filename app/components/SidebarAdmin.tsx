'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export default function SidebarAdmin() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="h-screen w-64 bg-primary text-white flex flex-col py-8 px-4 justify-between">
            <div>
                <div className="flex flex-col items-center mb-10">
                    <Image src="/logo.png" alt="Logo" width={64} height={64} className="rounded-full" />
                    <div className="text-center mt-2">
                        <h1 className="text-sm font-semibold">PPP TAWANG</h1>
                        <p className="text-xs text-gray-300">KAB. KENDAL</p>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-4">
                    <Link
                        href="/admin"
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-4 rounded-md text-sm font-medium"
                    >
                        <h5>Berita Management</h5>
                    </Link>
                </nav>
            </div>

            {/* Bottom Section: Logout */}
            <div>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm font-semibold"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}