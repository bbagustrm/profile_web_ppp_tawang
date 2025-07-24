'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const [isAboutOpen, setIsAboutOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/layanan', label: 'Layanan Kami' },
        { href: '/news', label: 'Berita Terbaru' },
        {
            label: 'About Us',
            dropdown: true,
            items: [
                { href: '/about', label: 'Profil' },
                { href: '/umkm', label: 'UMKM' },
                { href: '/sejarah', label: 'Sejarah' },
            ]
        }
    ] satisfies {
        href?: string;
        label: string;
        dropdown?: boolean;
        items?: { href: string; label: string }[];
    }[]

    return (
        <div className={`w-full fixed top-0 px-4 py-3 lg:py-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-[#163d4a] shadow-md' : 'bg-transparent text-white'}`}>
            <div className="container w-full mx-auto flex justify-between items-center">
                <Link href="/" className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full" />
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center group">
                    {navItems.map((item) => {
                        if (item.dropdown && item.items) {
                            return (
                                <DropdownMenu key={item.label}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="link"
                                            className={`relative p-8 rounded-none text-white hover:no-underline transition-colors duration-300
                                            ${pathname.startsWith('/about') || pathname === '/umkm' || pathname === '/sejarah'
                                                ? `border-b-2 ${isScrolled ? 'border-[#163d4a]' : 'border-white'} group-hover:[&:not(:hover)]:border-transparent`
                                                : ''
                                            }
                                            hover:border-b-2 ${isScrolled ? 'hover:border-[#163d4a] text-[#163d4a]' : 'hover:border-white text-white'}
                                            `}
                                        >
                                            {item.label}
                                            <ChevronDown size={24} className="text-white" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white text-[#163d4a] border-none mt-2">
                                        {item.items.map((subItem) => (
                                            <DropdownMenuItem asChild key={subItem.href} className='px-8 '>
                                                <Link href={subItem.href}>{subItem.label}</Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        }

                        return item.href ? (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="link"
                                    className={`relative p-8 rounded-none text-white hover:no-underline transition-colors duration-300
                                    ${pathname === item.href
                                        ? `border-b-2 ${isScrolled ? 'border-[#163d4a]' : 'border-white'} group-hover:[&:not(:hover)]:border-transparent`
                                        : ''
                                    }
                                    hover:border-b-2 ${isScrolled ? 'hover:border-[#163d4a] text-[#163d4a]' : 'hover:border-white text-white'}
                                `}
                                >
                                    {item.label}
                                </Button>
                            </Link>
                        ) : null
                    })}
                    <Link href="/admin">
                        <Button className={`transition-colors duration-300 ml-8 ${isScrolled ? '' : 'text-[#163d4a] bg-white hover:bg-[#163d4a]/90 hover:text-white'}`}>
                            Login
                            <ArrowRight size={20} className="md:w-6 md:h-6" />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Button */}
                <div className="lg:hidden flex items-center space-x-4 z-50 absolute top-6 right-6">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50">
                        <div className="flex flex-col justify-between fixed right-0 top-0 h-full w-64 px-4 pt-2 pb-8 shadow-lg transform transition-transform duration-300 ease-in-out bg-[#163d4a] text-white">
                            <div className="flex flex-col pt-10 space-y-2">

                                {navItems.map((item) => {
                                    if (item.dropdown && item.items) {
                                        return (
                                            <div key={item.label} className="flex flex-col">
                                                <button
                                                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                                                    className="text-left w-full flex justify-between px-4 py-4 text-white font-semibold "
                                                >
                                                    {item.label}
                                                    <ChevronDown size={24} className="text-white" />
                                                </button>
                                                {isAboutOpen && (
                                                    <div className="pl-6 flex flex-col gap-1">
                                                        {item.items.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                onClick={() => {
                                                                    setIsMenuOpen(false)
                                                                    setIsAboutOpen(false)
                                                                }}
                                                                className="py-2 px-4 hover:underline"
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }

                                    return item.href ? (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Button
                                                variant="link"
                                                className={`relative py-8 w-full justify-start rounded-none text-white hover:no-underline
                                                ${pathname === item.href ? 'border-b-2 border-neutral-400' : ''}
                                                hover:border-b-2 hover:border-neutral-400 text-white`}
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    ) : null
                                })}
                            </div>

                            <Link href="/admin">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="py-6 size-8 w-full font-semibold"
                                >
                                    Login
                                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
