import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "phosphor-react";

export default function MantulSection() {
    return (
        <div className="w-full h-[540px] md:h-[520px] lg:h-[480px] relative">
            <Image
                src="/mantul.png"
                alt="Gambar"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 z-10 px-8 lg:px-16 xl:px-24 container mx-auto flex flex-col lg:flex-row gap-8 md:justify-between items-start lg:items-center py-12">
                <div className="w-full lg:w-[40%] text-white space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-1.5 h-20 bg-teal-500" />
                        <div className="flex flex-col justify-center gap-4">
                            <h6>NILAI BUDAYA KERJA</h6>
                            <h2>MANTUL</h2>
                        </div>
                    </div>
                </div>

                <Card className="w-full lg:w-[60%] text-white bg-transparent border-none">
                    <CardContent className="space-y-4 p-6">
                        {[
                            {
                                title: "Mudah dan Murah",
                                desc: "yaitu pelayanan yang berhubungan dengan fungsi perusahaan dan pemerintahan yang dilakukan di PPP Tawang tidak berbelit dengan prosedur yang mudah diikuti, tidak berbayar dan jika berbayarpun sesuai dengan regulasi yang ada.",
                            },
                            {
                                title: "Akuntabel",
                                desc: "yaitu senantiasa melaksanakan tugas dengan baik dan mempertanggungjawabkannya dari proses sampai dengan hasil.",
                            },
                            {
                                title: "Transparan",
                                desc: "yaitu adanya keterbukaan informasi yang dapat diakses oleh pengguna jasa.",
                            },
                            {
                                title: "Berkualitas",
                                desc: "yaitu melayani masyarakat dengan sepenuh hati, sesuai regulasi, cepat, akurat, dan aman.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <CheckCircle size={28} weight="fill" className="text-yellow-400 shrink-0" />

                                <p className="text-sm md:text-base text-white/80">
                                    <span className="inline font-bold text-white">{item.title}</span>, {item.desc}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
