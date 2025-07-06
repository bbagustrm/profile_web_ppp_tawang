'use client'

import Image from 'next/image'
import Link from 'next/link'
import {CloudSun} from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {Button} from "@radix-ui/themes";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/news', label: 'News' }
    ]

    return (
        <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white text-primary shadow-md'
                : 'bg-transparent text-white'
        }`}>
            <div className="container w-full mx-auto flex justify-between items-center">
                <div className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full"/>
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </div>
                <div className="flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            <Button
                                className={`button-link relative py-6 ${
                                    pathname === item.href
                                        ? `border-b-2  ${isScrolled ? 'border-primary border-b-[3px]' : 'border-white'}`
                                        : ''
                                }`}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </div>
                <div className="flex space-x-3 items-center">
                    <CloudSun size={32}/>
                    <div className="flex flex-col">
                        <h5>Berawan</h5>
                        <h5>24-30°C</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}