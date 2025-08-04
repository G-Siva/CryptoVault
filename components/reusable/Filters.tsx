'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function Filters({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`/?${params.toString()}`);
  };

  const sortOptions = [
    { value: 'market_cap_desc', label: 'Market Cap (High → Low)', icon: '📈' },
    { value: 'market_cap_asc', label: 'Market Cap (Low → High)', icon: '📉' },
    { value: 'volume_desc', label: 'Volume (High → Low)', icon: '🔊' },
    { value: 'volume_asc', label: 'Volume (Low → High)', icon: '🔉' },
    { value: 'price_desc', label: 'Price (High → Low)', icon: '💰' },
    { value: 'price_asc', label: 'Price (Low → High)', icon: '🪙' },
    { value: 'percent_change_24h_desc', label: '24h Change (High → Low)', icon: '🚀' },
    { value: 'percent_change_24h_asc', label: '24h Change (Low → High)', icon: '📉' },
  ];

  const getCurrentOption = () => {
    return sortOptions.find(option => option.value === currentSort) || sortOptions[0];
  };

  return (
    <div className="relative">
      <div className="glass-card p-1 rounded-2xl">
        <Select onValueChange={handleSortChange} defaultValue={currentSort}>
          <SelectTrigger className="w-64 bg-transparent border-none focus:ring-0 focus:ring-offset-0 h-12 px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                <ArrowUpDown className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xs text-foreground/60 uppercase tracking-wider">Sort by</div>
                <SelectValue>
                  <span className="text-sm font-medium text-foreground">
                    {getCurrentOption().label}
                  </span>
                </SelectValue>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="glass-card border-none shadow-xl">
            <div className="p-2">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Filter Options</span>
              </div>
              {sortOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="rounded-lg my-1 cursor-pointer hover:bg-primary/20 focus:bg-primary/20 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}