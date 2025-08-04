import { getCoinsMarkets } from '@/lib/api/coingecko';
import CoinTable from '@/components/reusable/CoinTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Coin } from '@/lib/types';

export default async function WatchList(){
    let coins: Coin[] = [];
    let error: string | null = null;

    try{
        coins = await getCoinsMarkets(1,250);

    } catch (err) {
        error = 'Failed to watchlist. Please try again.';
    }

    return(
        <div className="container max-auto p-4">
            <h1 className="text-2xl font-bold mb-4">WatchList</h1>
            {error?(
                <div className="text-center text-red-600">{error}</div>
            ) : coins.length === 0?(
                <div className="text-center">
                    <p>Your Watchlist is empty.</p>
                    <Button asChild>
                        <Link href="/">Go to Markets</Link>
                    </Button>
                </div>
            ) : (
                <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                    <CoinTable coins={coins} isWatchlist />
                </Suspense>
            )}
        </div>
    );
}