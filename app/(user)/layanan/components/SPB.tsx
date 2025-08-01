'use client'

import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {CheckCircle, Circle } from "phosphor-react";



export default function SPBSection() {
    return (
        <div className="flex flex-col items-center gap-12 ">
            <h3>Alur Penerbitan SPB</h3>
            <div className="w-full max-w-4xl relative aspect-[3/1]">
                <Image
                    src="/alur-spb.png"
                    alt="Alur SPB"
                    fill
                    className="object-contain"
                />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-8'>
                {/*left*/}
                <Card className="w-full md:w-[60%] text-[#163d4a] shadow-card">
                    <CardHeader className="space-y-4">
                        <CardTitle><h3>SPB (Surat Persetujuan Berlayar)</h3></CardTitle>
                        <CardDescription><p>SPB adalah dokumen resmi dari negara yang wajib dimiliki oleh kapal perikanan sebelum berlayar dari pelabuhan.</p></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>Surat pernyataan kesiapan dari nahkoda</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>Bukti bayar PPN untuk kapal dengan BBM non subsidi</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>Izin berusaha subsektor penangkapan ikan</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>SLO (Surat Laik Operasi) untuk kapal 5 GT</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>STBLKK (Surat Tanda Bukti Lapor Kedatangan)</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>Perjanjian kerja laut</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                            <p className='w-full'>Jaminan asuransi/BPJS ketenagakerjaan</p>
                        </div>
                    </CardContent>
                </Card>
                {/*right*/}
                <Card className="w-full md:w-[40%]">
                    <CardHeader className="space-y-4">
                        <CardTitle><h3>Note</h3></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className='space-y-4 text-[#163d4a]'>
                            <h5 className='text-teal-600'>Penundaan SPB</h5>
                            <div className='flex gap-4 '>
                                <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                                <p className='w-full'>Bisa terjadi karena cuaca buruk.</p>
                            </div>
                        </div>
                        <div className='space-y-4 text-[#163d4a]'>
                            <h5 className='text-teal-600'>Penundaan SPB</h5>
                            <div className='flex gap-4 '>
                                <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                                <p className='w-full'>Misalnya untuk kapal yang akan menolong kapal lain atau uji coba mesin.</p>
                            </div>
                        </div>
                        <div className='space-y-4 text-[#163d4a]'>
                            <h5 className='text-teal-600'>Penundaan SPB</h5>
                            <div className='flex gap-4 '>
                                <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                                <p className='w-full'>Jika kapal tak kunjung berangkat, melakukan pelanggaran, atau keluar pelabuhan tanpa izin.</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}