// app/register/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function RegisterPage() {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    // ⛳️ Redirect jika sudah login
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                router.push('/admin')
            }
        }
        checkSession()
    }, [router, supabase])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/callback`,
            },
        })

        if (error) {
            setMessage(`❌ ${error.message}`)
        } else {
            router.push('/redirect')
        }

        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 text-[#163d4a]">
            <Card className="w-full max-w-md shadow-md border">
                <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-primary">Daftar Admin</h3>
                        <p className="text-sm text-muted-foreground mt-1">Daftar ke panel admin</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Loading...' : 'Daftar'}
                        </Button>

                        {message && (
                            <p className="text-sm text-center mt-2 text-muted-foreground">{message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
