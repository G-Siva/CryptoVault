'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '../SearchBar';
import Filters from '@/components/Filters';

export default function Control() {
    const searchParams = useSearchParams();
    const sort = searchParams.get('sort') || 'market_cap_desc';

    return (
        <div className="space-y-8">
            {/* Search Bar Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold gradient-text mb-2">Market Overview</h2>
                        <p className="text-foreground/60">
                            Discover and track the performance of thousands of cryptocurrencies
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <SearchBar />
                        <Filters currentSort={sort} />
                    </div>
                </div>
            </div>
        </div>
    );
}
