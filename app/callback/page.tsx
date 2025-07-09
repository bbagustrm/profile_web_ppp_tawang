'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'

export default function CallbackPage() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()

            if (data.session) {
                setStatus('success')
                setTimeout(() => router.push('/admin'), 1000) // redirect halus
            } else {
                setStatus('failed')
                setTimeout(() => router.push('/auth/login'), 2000)
            }
        }

        checkSession()
    }, [router, supabase])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            {status === 'loading' && (
                <>
                    <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-4" />
                    <p className="text-gray-700 text-center text-lg font-medium">
                        Verifikasi akun...
                    </p>
                </>
            )}
            {status === 'success' && (
                <p className="text-green-600 text-lg font-semibold">
                    ✅ Verifikasi berhasil!
                </p>
            )}
            {status === 'failed' && (
                <p className="text-red-500 text-lg font-semibold">
                    ❌ Gagal memverifikasi. Mengarahkan ke halaman login...
                </p>
            )}
        </div>
    )
}
