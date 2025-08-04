'use client';

import { useState, useEffect } from 'react';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('watchlist') || '[]');
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleCoin = (coinId: string) => {
    setWatchlist((prev) => (prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]));
  };

  return { watchlist, toggleCoin };
}