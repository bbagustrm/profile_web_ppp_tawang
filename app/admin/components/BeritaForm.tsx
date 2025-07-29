'use client'

import React, { useState, useRef, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner"
import dynamic from 'next/dynamic'
import {
    Upload,
    X,
    Image as ImageIcon,
    FileText,
    Save,
    AlertCircle,
    CheckCircle
} from "lucide-react";

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
    ssr: false,
    loading: () => <p className="text-slate-500 text-sm">Memuat editor...</p>
})

type BeritaFormProps = {
    berita?: {
        id: string
        title: string
        content: string
        image_path?: string
    }
}

export default function BeritaForm({ berita }: BeritaFormProps) {
    const [judul, setJudul] = useState(berita?.title || '')
    const [isi, setIsi] = useState(berita?.content || '')
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(berita?.image_path || null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        if (berita) {
            setJudul(berita.title)
            setIsi(berita.content)
            setImagePreview(berita.image_path || null)
        }
    }, [berita])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Ukuran file maksimal 2MB' }))
                return
            }
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, image: 'File harus berupa gambar' }))
                return
            }

            setErrors(prev => ({ ...prev, image: '' }))
            setImage(file)

            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImage(null)
        setImagePreview(null)
        setErrors(prev => ({ ...prev, image: '' }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // Fungsi untuk strip HTML tags untuk validasi panjang text
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]+>/g, '').trim()
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!judul.trim()) {
            newErrors.judul = 'Judul berita wajib diisi'
        } else if (judul.length < 10) {
            newErrors.judul = 'Judul minimal 10 karakter'
        } else if (judul.length > 100) {
            newErrors.judul = 'Judul maksimal 100 karakter'
        }

        const plainTextContent = stripHtml(isi);
        if (!plainTextContent.trim()) {
            newErrors.isi = 'Isi berita wajib diisi'
        } else if (plainTextContent.length < 50) {
            newErrors.isi = 'Isi berita minimal 50 karakter'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const uploadImageToStorage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

            const { error } = await supabase.storage
                .from('news-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw new Error('Gagal mengupload gambar')

            const { data: { publicUrl } } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName)

            return publicUrl
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        setErrors(prev => ({ ...prev, submit: '' }))

        try {
            let imageUrl: string | null = berita?.image_path || null
            if (image) {
                imageUrl = await uploadImageToStorage(image)
            }

            if (berita) {
                // UPDATE berita
                const { error } = await supabase
                    .from('berita')
                    .update({
                        title: judul.trim(),
                        content: isi, // Rich text HTML content
                        image_path: imageUrl
                    })
                    .eq('id', berita.id)

                if (error) throw new Error('Gagal memperbarui berita')
                toast('Berita berhasil diperbarui!')
            } else {
                // INSERT berita baru
                const { error } = await supabase
                    .from('berita')
                    .insert([
                        {
                            title: judul.trim(),
                            content: isi, // Rich text HTML content
                            image_path: imageUrl
                        }
                    ])

                if (error) throw new Error('Gagal menambahkan berita')
                toast('Berita berhasil ditambahkan!')
            }

            setTimeout(() => router.push('/admin'), 1000)
        } catch (error: unknown) {
            console.error('Submit error:', error)
            if (error instanceof Error) {
                setErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Terjadi kesalahan. Silakan coba lagi.'
                }))
            } else {
                setErrors(prev => ({
                    ...prev,
                    submit: 'Terjadi kesalahan tak dikenal.'
                }))
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submit Error Alert */}
            {errors.submit && (
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        {errors.submit}
                    </AlertDescription>
                </Alert>
            )}

            {/* Judul */}
            <div className="space-y-2">
                <Label htmlFor="judul" className="text-sm font-semibold text-slate-700 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Judul Berita <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                    id="judul"
                    type="text"
                    placeholder="Masukkan judul berita yang menarik..."
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className={errors.judul ? 'border-red-300 focus:ring-red-200' : ''}
                />
                <div className="flex justify-between text-sm">
                    <span className={errors.judul ? 'text-red-600' : 'text-slate-500'}>
                        {errors.judul || 'Minimal 10 karakter, maksimal 100 karakter'}
                    </span>
                    <span className={`text-xs ${judul.length > 100 ? 'text-red-600' : 'text-slate-400'}`}>
                        {judul.length}/100
                    </span>
                </div>
            </div>

            {/* Upload Gambar Featured */}
            <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                    Gambar Utama Berita
                    <span className="text-slate-400 ml-1 font-normal">(Opsional)</span>
                </Label>

                {!imagePreview ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                <Upload className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-700 mb-1">
                                Klik untuk upload gambar utama
                            </p>
                            <p className="text-xs text-slate-500">
                                PNG, JPG, hingga 2MB
                            </p>
                        </label>
                    </div>
                ) : (
                    <Card className="overflow-hidden">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={120}
                                    height={120}
                                    className="rounded-lg object-cover border border-slate-200"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 truncate">
                                                {image?.name || 'Gambar saat ini'}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {image ? (image.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={removeImage}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="mt-2 text-green-600 text-xs flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Gambar siap digunakan
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {errors.image && (
                    <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.image}
                    </p>
                )}
            </div>

            {/* Rich Text Editor untuk Isi Berita */}
            <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Isi Berita <span className="text-red-500 ml-1">*</span>
                </Label>

                <RichTextEditor
                    content={isi}
                    onChange={setIsi}
                    placeholder="Tulis isi berita secara lengkap dan informatif. Anda dapat menambahkan format teks, gambar, dan link."
                />

                <div className="flex justify-between text-sm">
                    <span className={errors.isi ? 'text-red-600' : 'text-slate-500'}>
                        {errors.isi || 'Minimal 50 karakter untuk isi berita (tanpa HTML tags)'}
                    </span>
                    <span className={`text-xs ${stripHtml(isi).length < 50 ? 'text-red-600' : 'text-slate-400'}`}>
                        {stripHtml(isi).length} karakter
                    </span>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                        setJudul('')
                        setIsi('')
                        removeImage()
                        setErrors({})
                    }}
                >
                    Reset Form
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Menyimpan...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Save className="w-4 h-4 mr-2" />
                            {berita ? 'Update Berita' : 'Simpan Berita'}
                        </div>
                    )}
                </Button>
            </div>
        </form>
    )
}