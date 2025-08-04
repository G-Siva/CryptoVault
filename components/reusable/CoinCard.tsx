'use client';

import Image from 'next/image';
import { CoinDetails } from '@/lib/types';
import WatchlistButton from './WatchlistButton';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Hash } from 'lucide-react';

interface CoinCardProps {
  coin: CoinDetails;
}

export default function CoinCard({ coin }: CoinCardProps) {
  const formatNumber = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return `${num.toLocaleString()}`;
  };

  const priceChange = coin.market_data?.price_change_percentage_24h;
  const isPositive = priceChange && priceChange >= 0;

  // Add safety checks for required data
  if (!coin || !coin.market_data) {
    return (
      <div className="floating-card w-full max-w-md text-center py-8">
        <div className="text-red-400 mb-4">⚠️</div>
        <h3 className="text-lg font-semibold mb-2">Invalid Coin Data</h3>
        <p className="text-sm text-foreground/60">Unable to display coin information</p>
      </div>
    );
  }

  return (
    <div className="floating-card w-full max-w-md">
      {/* Header with coin info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image 
              src={coin.image?.large || coin.image?.small || '/placeholder-coin.svg'} 
              alt={coin.name} 
              width={56} 
              height={56} 
              className="rounded-full ring-4 ring-white/20" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-coin.svg';
              }}
            />
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur opacity-50"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{coin.name}</h2>
            <p className="text-foreground/60 uppercase tracking-wider text-sm font-medium">
              {coin.symbol}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="coin-rank mb-2">
            #{coin.market_cap_rank}
          </div>
          <WatchlistButton coinId={coin.id} />
        </div>
      </div>

      {/* Price Section */}
      <div className="neon-border mb-6">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Current Price</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${coin.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}
            </span>
            {priceChange && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(priceChange).toFixed(2)}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-secondary" />
            <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">Market Cap</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            {formatNumber(coin.market_data?.market_cap?.usd)}
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">24h Volume</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            {formatNumber(coin.market_data?.total_volume?.usd)}
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">Total Supply</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            {coin.market_data?.total_supply?.toLocaleString() || 'N/A'}
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">Circulating</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            {coin.market_data?.circulating_supply?.toLocaleString() || 'N/A'}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <span className="text-sm text-foreground/70">All Time High</span>
          <span className="text-sm font-medium text-foreground">
            ${coin.market_data?.ath?.usd?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <span className="text-sm text-foreground/70">All Time Low</span>
          <span className="text-sm font-medium text-foreground">
            ${coin.market_data?.atl?.usd?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-foreground/70">Price Change (7d)</span>
          <span className={`text-sm font-medium ${
            coin.market_data?.price_change_percentage_7d && coin.market_data.price_change_percentage_7d >= 0 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {coin.market_data?.price_change_percentage_7d?.toFixed(2) || 'N/A'}%
          </span>
        </div>
      </div>
    </div>
  );
}