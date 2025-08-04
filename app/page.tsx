import { getCoinsMarkets } from '@/lib/api/coingecko';
import { Coin } from '@/lib/types';
import QuickStats from '@/components/stats/quickstats';
import BottomStats from '@/components/stats/bottomstats';
import Control from '@/components/home/control';
import CoinTable from '@/components/reusable/CoinTable';
import SkeletonLoader from '@/components/reusable/SkeletonLoader';
import { TrendingUp } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; sort?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'market_cap_desc';

  let coins: Coin[] = [];
  let error: string | null = null;

  try {
    coins = await getCoinsMarkets(page, 50, sort);
    if (search) {
      coins = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
  } catch (err: unknown) {
    console.error('API Error:', err);
    const errorObj = err as { response?: { status?: number }; code?: string };
    if (errorObj.response?.status === 429) {
      error = 'Rate limit exceeded. Please try again in a few minutes.';
    } else if (errorObj.response?.status === 404) {
      error = 'API endpoint not found. Please check the configuration.';
    } else if (errorObj.code === 'ECONNREFUSED' || errorObj.code === 'ENOTFOUND') {
      error = 'Unable to connect to the API. Please check your internet connection.';
    } else {
      error = 'Failed to load cryptocurrency data. Please try again.';
    }
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Quick Stats Section */}
      <div className="mb-12 sm:mb-16">
        <QuickStats />
      </div>
      
      {/* Control Section */}
      <div className="mb-12 sm:mb-16">
        <Control />
      </div>
      
      {/* Coins Table Section */}
      <div className="mb-12 sm:mb-16">
        {error ? (
          <div className="floating-card text-center py-8 sm:py-12 px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Oops! Something went wrong</h3>
            <p className="text-foreground/60 mb-4 sm:mb-6 text-sm sm:text-base">{error}</p>
            <form action="/" method="get">
              <button 
                type="submit"
                className="btn-modern"
              >
                Try Again
              </button>
            </form>
          </div>
        ) : coins.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <CoinTable coins={coins} />
        )}
      </div>
      
      {/* Bottom Stats Section */}
      <div className="mb-6 sm:mb-8">
        <BottomStats />
      </div>
    </div>
  );
}