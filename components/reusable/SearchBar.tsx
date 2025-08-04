'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, TrendingUp } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      params.set('search', debouncedQuery);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  const clearSearch = () => {
    setQuery('');
  };

  const popularSearches = ['Bitcoin', 'Ethereum', 'Solana', 'Cardano'];

  return (
    <div className="relative w-full max-w-lg">
      <div className={`search-container transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''
      }`}>
        <div className="flex items-center px-4 py-3">
          <Search className={`w-5 h-5 mr-3 transition-colors duration-200 ${
            isFocused ? 'text-primary' : 'text-foreground/40'
          }`} />
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex-1 bg-transparent border-none text-foreground placeholder-foreground/50 focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-foreground/60" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Searches Dropdown */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => setQuery(search)}
                className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}