'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from '@/components/ui/card'


export default function RedirectPage() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 text-[#163d4a]">
            <Card className="text-center space-y-4">
                <CardContent className="p-6 space-y-6 text-[#163d4a]">
                    <h3 >Pendaftaran Berhasil!</h3>
                    <p className="text-sm text-muted-foreground">
                        Silakan buka email untuk mengonfirmasi pendaftaran.
                    </p>
                    <Button
                        onClick={() => window.open('https://mail.google.com/', '_blank')}
                        className="w-full flex gap-4 items-center justify-center bg-teal-500 hover:bg-teal-600 text-white "
                    >
                        Buka Gmail
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
