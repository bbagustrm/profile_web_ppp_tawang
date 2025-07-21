'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"


export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        { href: '/layanan', label: 'Layanan Kami' },
        { href: '/news', label: 'Berita Terbaru' },
        { href: '/about', label: 'About Us' },
    ]

    return (
        <div className={`w-full fixed top-0 px-4 py-3 lg:py-0 left-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white text-primary shadow-md'
                : 'bg-transparent text-white'
        }`}>
            <div className="container w-full mx-auto flex justify-between items-center">
                <Link href="/" className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full"/>
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center group">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            <Button
                                variant="link"
                                className={`relative p-8 rounded-none text-white hover:no-underline
                                    ${pathname === item.href
                                    ? `border-b-2 ${isScrolled ? 'border-primary' : 'border-white'} 
                                           group-hover:[&:not(:hover)]:border-transparent`
                                    : ''
                                }
                                    hover:border-b-2 ${isScrolled ? 'hover:border-primary text-primary' : 'hover:border-white text-white'}
                                `}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                    <Link href="/admin">
                        <Button className={`px-8 ml-8 ${isScrolled ? 'text-white bg-primary ' : 'text-primary bg-white hover:text-white'}`}>
                            Login
                            <ArrowRight size={20} className="md:w-6 md:h-6"/>

                        </Button>
                    </Link>

                </div>

                <div className="lg:hidden flex items-center space-x-4 z-50 absolute top-6 right-6">
                    {/* Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X size={24} className="text-white" />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>


                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50">
                        <div className={`flex flex-col justify-between fixed right-0 top-0 h-full w-64 px-4 pt-2 pb-8 shadow-lg transform transition-transform duration-300 ease-in-out bg-primary text-white`}>
                            <div className="flex flex-col pt-10  space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Button
                                            variant="link"
                                            className={`relative py-8 w-full justify-start rounded-none text-white hover:no-underline
                                            ${pathname === item.href
                                                ? `border-b-2 border-white group-hover:[&:not(:hover)]:border-transparent`
                                                : ''
                                            }
                                            hover:border-b-2 hover:border-white text-white'}
                                            `}
                                        >
                                            {item.label}
                                        </Button>

                                    </Link>
                                ))}
                            </div>
                            <Link href="/admin">
                                <Button variant="default" size="icon" className=' size-8 w-full text-primary font-semibold bg-white hover:text-white'>
                                    Login
                                    <ArrowRight size={20} className="md:w-6 md:h-6"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}