import React from 'react';
import { TrendingUp, Award, Zap, Users } from 'lucide-react';

export default function QuickStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="stat-card group">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground/60">Market Leaders</p>
              <p className="text-lg sm:text-xl font-bold gradient-text">Top Gainers</p>
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground/60">Premium Assets</p>
              <p className="text-lg sm:text-xl font-bold gradient-text">Blue Chips</p>
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground/60">High Activity</p>
              <p className="text-lg sm:text-xl font-bold gradient-text">Volume Leaders</p>
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground/60">Community Favorites</p>
              <p className="text-lg sm:text-xl font-bold gradient-text">Trending</p>
            </div>
          </div>
        </div>
      </div>
    )
}
