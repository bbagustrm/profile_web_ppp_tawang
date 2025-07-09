'use client'

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const supabase = createClientComponentClient();
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/callback',
            },
        })

        if (error) {
            setMessage(`❌ ${error.message}`)
        } else {
            setMessage('✅ Pendaftaran berhasil! Silakan cek email untuk konfirmasi.')
            // Jika kamu ingin langsung arahkan ke login
            router.push('/login')
        }

        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center bg-background mt-24">
            <div className="max-w-md w-full space-y-4 p-8 bg-white border-border rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-center">Daftar Akun</h3>
                <p className="text-center pb-8">Kebutuhan Development</p>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="font-sans w-full px-4 py-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="font-sans w-full px-4 py-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        <p>{loading ? 'Mendaftarkan...' : 'Daftar'}</p>
                    </button>
                    {message && <p className="text-sm text-center mt-2">{message}</p>}
                </form>
            </div>
        </div>
    )
}
