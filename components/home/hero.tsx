import React from "react";

export default function Hero() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
             <div className="hero-gradient relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 overflow-hidden">
                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-8">
                     <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 text-shadow">
                       Explore the Future of
                         <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Digital Assets
                        </span>
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
                          Track, analyze, and discover cryptocurrencies with real-time data and advanced insights
                      </p>
                   </div>
                </div>
            </div>
        </div>
    )
}