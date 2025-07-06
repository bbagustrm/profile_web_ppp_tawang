import Image from "next/image";

export default function HeroSection2({ title, description } : {title: string, description: string}) {
    return (
        <div className="relative w-full h-72">
            <Image
                src="/hero.png"
                alt="Hero Image"
                fill
                priority
                className="object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-16 translate-y-6 text-white space-y-4">
                <h2 className="font-sans">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}