import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle, Circle} from "phosphor-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function PersyaratanKapalKecilSection() {
    return (
        <div className="flex flex-col items-center gap-8">
            <Card className="w-full text-[#163d4a] shadow-card">
                <CardHeader className="space-y-4">
                    <CardTitle><h3>Persyaratan Buku Kapal Perikanan Nelayan Kecil {"<"}  5 GT (E-BKP NK)</h3></CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-4">
                        <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                        <p className='w-full'>SIUP (Surat Izin Usaha Perikanan)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                        <p className='w-full'>PPKP (Pas Kecil Kapal Perikanan)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                        <p className='w-full'>SKKP (Surat Keterangan Kapal Perikanan)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                        <p className='w-full'>BKP (Buku Kapal Perikanan)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <CheckCircle size={32} weight="fill" className={"text-teal-500"}/>
                        <p className='w-full'>SIPI (Surat Izin Penangkapan Ikan)</p>
                    </div>
                </CardContent>
            </Card>

            <div className='w-full flex flex-col lg:flex-row  gap-4'>
                {/*1. NPWP*/}
                <Card className="w-full lg:w-1/3 text-[#163d4a] shadow-card">
                    <CardHeader className="space-y-4">
                        <CardTitle><h3>NPWP</h3></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>KTP</p>
                        </div>
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>KK</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="https://ereg.pajak.go.id/">
                            <Button variant="secondary" className="px-4 font-semibold">
                                Daftar di: https://ereg.pajak.go.id/
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
                {/*1. NIB (Nomor Induk Berusaha)*/}
                <Card className="w-full lg:w-1/3 text-[#163d4a] shadow-card">
                    <CardHeader className="space-y-4">
                        <CardTitle><h3>NIB (Nomor Induk Berusaha)</h3></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>KTP</p>
                        </div>
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>NPWP</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="https://oss.go.id/">
                            <Button variant="secondary" className="px-4 font-semibold">
                                Daftar di: https://oss.go.id/
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="w-full lg:w-1/3 text-[#163d4a] shadow-card">
                    <CardHeader className="space-y-4">
                        <CardTitle><h3>NPWP</h3></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>KTP</p>
                        </div>
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>NIB</p>
                        </div>
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>Pas Kecil</p>
                        </div>
                        <div className='flex gap-4 '>
                            <Circle size={12} weight="fill" className='mt-2 text-teal-600'/>
                            <p className='w-full'>Foto Kapal (tampak samping)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}