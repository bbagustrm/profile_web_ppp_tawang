import Image from "next/image";

export default function HeroSection2({ title, image, description } : {title: string,image: string, description: string}) {
    return (
        <div className="relative w-full h-40 md:h-72">
            <Image
                src={image || "/hero.png"}
                alt="Hero Image"
                fill
                priority
                className="object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-16 translate-y-6 text-white space-y-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h3>
                <p className='hidden md:block'>{description}</p>
            </div>
        </div>
    );
}