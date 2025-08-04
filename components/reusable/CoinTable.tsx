'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';
import { Coin } from '@/lib/types';
import { useWatchlist } from '@/lib/hooks/useWatchlist';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export default function CoinTable({ coins, isWatchlist = false }: { coins: Coin[]; isWatchlist?: boolean }) {
  const { watchlist } = useWatchlist();
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>(coins);

  useEffect(() => {
    if (isWatchlist) {
      setFilteredCoins(coins.filter((coin) => watchlist.includes(coin.id)));
    } else {
      setFilteredCoins(coins);
    }
  }, [coins, isWatchlist, watchlist]);

  const formatNumber = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="table-modern">
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            {isWatchlist ? 'Your Watchlist' : 'Cryptocurrency Markets'}
          </h2>
          <div className="text-sm text-foreground/60">
            Showing {filteredCoins.length} cryptocurrencies
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-foreground/80 font-semibold p-6 text-left">#</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-left">Asset</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-right">Price</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-right">24h Change</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-right">Market Cap</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-right">Volume (24h)</TableHead>
              <TableHead className="text-foreground/80 font-semibold p-6 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="text-foreground/60">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium mb-2">
                      {isWatchlist ? 'No coins in your watchlist' : 'No cryptocurrencies found'}
                    </p>
                    <p className="text-sm text-foreground/40">
                      {isWatchlist ? 'Add some coins to track their performance' : 'Try adjusting your search criteria'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCoins.map((coin, index) => (
                <TableRow key={coin.id} className="table-row-modern group">
                  <TableCell className="p-6">
                    <div className="coin-rank">
                      {coin.market_cap_rank || index + 1}
                    </div>
                  </TableCell>

                  <TableCell className="p-6">
                    <Link href={`/coin/${coin.id}`} className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-200">
                      <div className="relative">
                        <Image 
                          src={coin.image} 
                          alt={coin.name} 
                          width={40} 
                          height={40} 
                          className="rounded-full ring-2 ring-white/20 group-hover:ring-primary/50 transition-all duration-300" 
                        />
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {coin.name}
                        </div>
                        <div className="text-sm text-foreground/60 uppercase tracking-wider">
                          {coin.symbol}
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="p-6 text-right">
                    <div className="font-semibold text-lg">
                      {coin.current_price != null ? formatNumber(coin.current_price) : 'N/A'}
                    </div>
                  </TableCell>

                  <TableCell className="p-6 text-right">
                    {coin.price_change_percentage_24h != null ? (
                      <div className={`flex items-center justify-end gap-1 font-medium ${
                        coin.price_change_percentage_24h >= 0 ? 'price-positive' : 'price-negative'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    ) : (
                      <span className="text-foreground/40">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="p-6 text-right">
                    <div className="font-medium">
                      {coin.market_cap != null ? formatNumber(coin.market_cap) : 'N/A'}
                    </div>
                  </TableCell>

                  <TableCell className="p-6 text-right">
                    <div className="font-medium">
                      {coin.total_volume != null ? formatNumber(coin.total_volume) : 'N/A'}
                    </div>
                  </TableCell>

                  <TableCell className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <WatchlistButton coinId={coin.id} />
                      <Link 
                        href={`/coin/${coin.id}`}
                        className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        View
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredCoins.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="text-foreground/60">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium mb-2">
                {isWatchlist ? 'No coins in your watchlist' : 'No cryptocurrencies found'}
              </p>
              <p className="text-sm text-foreground/40">
                {isWatchlist ? 'Add some coins to track their performance' : 'Try adjusting your search criteria'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredCoins.map((coin, index) => (
              <div key={coin.id} className="stat-card group">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 group-hover:scale-105 transition-transform duration-200">
                      <div className="relative">
                        <Image 
                          src={coin.image} 
                          alt={coin.name} 
                          width={40} 
                          height={40} 
                          className="rounded-full ring-2 ring-white/20 group-hover:ring-primary/50 transition-all duration-300" 
                        />
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {coin.name}
                        </div>
                        <div className="text-sm text-foreground/60 uppercase tracking-wider">
                          #{coin.market_cap_rank || index + 1} • {coin.symbol}
                        </div>
                      </div>
                    </Link>
                    <WatchlistButton coinId={coin.id} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-foreground/60 mb-1">Price</div>
                      <div className="font-semibold">
                        {coin.current_price != null ? formatNumber(coin.current_price) : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground/60 mb-1">24h Change</div>
                      {coin.price_change_percentage_24h != null ? (
                        <div className={`flex items-center gap-1 font-medium ${
                          coin.price_change_percentage_24h >= 0 ? 'price-positive' : 'price-negative'
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      ) : (
                        <span className="text-foreground/40">N/A</span>
                      )}
                    </div>
                    <div>
                      <div className="text-foreground/60 mb-1">Market Cap</div>
                      <div className="font-medium">
                        {coin.market_cap != null ? formatNumber(coin.market_cap) : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground/60 mb-1">Volume (24h)</div>
                      <div className="font-medium">
                        {coin.total_volume != null ? formatNumber(coin.total_volume) : 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <Link 
                      href={`/coin/${coin.id}`}
                      className="w-full text-center px-4 py-2 text-sm font-medium bg-primary/20 text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}