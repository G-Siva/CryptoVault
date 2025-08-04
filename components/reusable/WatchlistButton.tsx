'use client';

import { useWatchlist } from '@/lib/hooks/useWatchlist';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function WatchlistButton({ coinId }: { coinId: string }) {
  const { watchlist, toggleCoin } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const isWatched = watchlist.includes(coinId);

  const handleClick = () => {
    setIsAnimating(true);
    toggleCoin(coinId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`relative overflow-hidden rounded-full w-10 h-10 transition-all duration-300 ${
        isWatched 
          ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30' 
          : 'hover:bg-white/10'
      } ${isAnimating ? 'scale-110' : ''}`}
      aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <div className="relative">
        <Star 
          className={`w-5 h-5 transition-all duration-300 ${
            isWatched 
              ? 'fill-yellow-400 text-yellow-400 scale-110' 
              : 'text-foreground/60 hover:text-yellow-400'
          } ${isAnimating ? 'animate-pulse' : ''}`} 
        />
        
        {/* Glow effect when watched */}
        {isWatched && (
          <div className="absolute inset-0 -z-10">
            <Star className="w-5 h-5 text-yellow-400 animate-ping opacity-30" />
          </div>
        )}
        
        {/* Sparkle effect on hover */}
        <div className={`absolute -inset-2 opacity-0 transition-opacity duration-300 ${
          isWatched ? 'group-hover:opacity-100' : ''
        }`}>
          <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-1 right-0 w-1 h-1 bg-yellow-400 rounded-full animate-twinkle animation-delay-300"></div>
          <div className="absolute bottom-0 left-1 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle animation-delay-600"></div>
        </div>
      </div>

      {/* Ripple effect */}
      <div className={`absolute inset-0 rounded-full transition-transform duration-300 ${
        isAnimating ? 'animate-ping bg-yellow-400/30' : ''
      }`}></div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </Button>
  );
}