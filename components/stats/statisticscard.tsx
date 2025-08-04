'use client';

import React from 'react'

export default function StatisticsCard() {
    return(
        <div className="container mx-auto px-4 sm:px-6">
            {/* Section Heading */}
            <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    Market Statistics
                </h2>
                <p className="text-white/60 text-base sm:text-lg px-4">
                    Real-time insights into the cryptocurrency market
                </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="stat-card group">
                    <div className="flex flex-col items-center text-center p-4 sm:p-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <h3 className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2">Total Coins</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">12,547</p>
                        <p className="text-green-400 text-xs sm:text-sm">+245 this week</p>
                    </div>
                </div>

                <div className="stat-card group">
                    <div className="flex flex-col items-center text-center p-4 sm:p-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
                        </div>
                        <h3 className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2">Market Cap</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">$2.67T</p>
                        <p className="text-green-400 text-xs sm:text-sm">+3.24% today</p>
                    </div>
                </div>

                <div className="stat-card group sm:col-span-2 lg:col-span-1">
                    <div className="flex flex-col items-center text-center p-4 sm:p-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
                        </div>
                        <h3 className="text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2">24h Volume</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">$184.5B</p>
                        <p className="text-red-400 text-xs sm:text-sm">-1.8% today</p>
                    </div>
                </div>
            </div>
        </div>     
    )
}
