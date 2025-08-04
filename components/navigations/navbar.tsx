'use client';

import Link from 'next/link';
import { TrendingUp, Wallet, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg`}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                        <div className="relative">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">CryptoVault</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="relative group">
                            <span className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
                                <BarChart3 className="w-4 h-4" />
                                <span>Markets</span>
                            </span>
                            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300"></div>
                        </Link>
                        <Link href="/watchlist" className="relative group">
                            <span className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
                                <Wallet className="w-4 h-4" />
                                <span>Watchlist</span>
                            </span>
                            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300"></div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white/90 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-white/10">
                        <div className="flex flex-col space-y-4 pt-4">
                            <Link 
                                href="/" 
                                className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <BarChart3 className="w-5 h-5" />
                                <span>Markets</span>
                            </Link>
                            <Link 
                                href="/watchlist" 
                                className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Wallet className="w-5 h-5" />
                                <span>Watchlist</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}