'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CloudSun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {Button} from "@radix-ui/themes"

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
                <div className="flex space-x-3 items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-full"/>
                    <div className="flex flex-col">
                        <p>PPP Tawang</p>
                        <h5>Kab. Kendal</h5>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8 group">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        >
                            <Button
                                className={`button-link relative py-6 
                                    ${pathname === item.href
                                    ? `border-b-2 ${isScrolled ? 'border-primary' : 'border-white'} 
                                           group-hover:[&:not(:hover)]:border-transparent`
                                    : ''
                                }
                                    hover:border-b-2 ${isScrolled ? 'hover:border-primary' : 'hover:border-white'}
                                `}
                            >
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button dan Weather */}
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
                        <div className={`fixed right-0 top-0 h-full w-64 px-4 py-2 shadow-lg transform transition-transform duration-300 ease-in-out bg-primary text-white`}>
                            {/* Weather Component */}
                            <div className="flex items-center space-x-2">
                                <CloudSun size={20}/>
                                <div className="flex flex-col text-sm">
                                    <h5>Berawan</h5>
                                    <h5>24-30°C</h5>
                                </div>
                            </div>
                            <div className="flex flex-col pt-10  space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Button
                                            className={`w-full text-left py-2 ${
                                                pathname === item.href
                                                    ? 'border-b-2 border-border pl-2'
                                                    : ''
                                            }`}
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex space-x-3 items-center">
                    <CloudSun size={32}/>
                    <div className="flex flex-col">
                        <h5>Berawan</h5>
                        <h5>24-30°C</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}