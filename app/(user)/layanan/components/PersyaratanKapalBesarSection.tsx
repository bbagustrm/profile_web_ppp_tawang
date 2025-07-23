import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckCircle} from "phosphor-react";

export default function PersyaratanKapalKecilSection() {
    const tableData = {
        headers: [
            "KTP", "NPWP", "NIB", "RKU", "SIUP", "BKP", "SIPI", "TTD Pemilik",
            "Form Deklarasi", "Gross Akte", "SKKP", "Surat Ukur", "PPKP", "PAS Besar",
            "Foto Pemilik", "Surat Permohonan", "Gambar Kapal Keseluruhan", "STBLKK",
            "Surat Docking", "Keterangan"
        ],
        rows: [
            {
                name: "SIUP",
                data: [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, ""],
            },
            {
                name: "SIPI",
                data: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, ""],
            },
            {
                name: "SKKP",
                data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, ""],
            },
            {
                name: "NIB",
                data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, ""],
            },
            {
                name: "e-BKP",
                data: [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, ""],
            },
            {
                name: "PPKP Baru",
                data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, "Surat Persetujuan nama kapal"],
            },
            {
                name: "PPKP Modifikasi",
                data: [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, ""],
            },
            {
                name: "PPKP Khusus",
                data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, "Foto Alat Tangkap"],
            },
        ],
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <Card className="w-full text-[#163d4a]">
                <CardHeader className="space-y-4">
                    <CardTitle><h3>Persyaratan Dokumen Kapal Perikanan Nelayan Besar {">"} 5 GT</h3></CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="overflow-auto rounded border border-gray-300">
                        <table className="min-w-[1200px] table-auto border-collapse text-sm text-left">
                            <thead className="bg-yellow-400 text-[#163d4a] font-semibold">
                            <tr>
                                <th className="border px-3 py-2 bg-yellow-400 whitespace-nowrap sticky left-0">
                                    Dokumen
                                </th>
                                {tableData.headers.map((header, index) => (
                                    <th key={index} className="border px-3 py-2 whitespace-nowrap">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="odd:bg-white even:bg-yellow-50">
                                    <td className="border px-3 py-2 font-medium sticky left-0 bg-yellow-100 z-10">{row.name}</td>
                                    {row.data.map((cell, colIndex) => (
                                        <td key={colIndex} className="border px-3 py-2 text-center">
                                            {cell === 1 ? (
                                                <CheckCircle size={20} weight="fill" className="text-teal-600 inline-block" />
                                            ) : cell === 0 ? (
                                                <p>-</p>
                                            ) : (
                                                <h6>{cell}</h6>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}