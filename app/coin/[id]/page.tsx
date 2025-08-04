import { getCoinDetails } from '@/lib/api/coingecko';
import CoinCard from '@/components/CoinCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Suspense } from 'react';
import { CoinDetails } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CoinDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function CoinDetailsPage({ params }: CoinDetailsPageProps) {
  let coin: CoinDetails | null = null;
  let error: string | null = null;

  // Validate params
  if (!params?.id) {
    error = 'Invalid coin ID. Please check the URL and try again.';
  } else {
    try {
      coin = await getCoinDetails(params.id);
    } catch (err: unknown) {
      console.error('API Error:', err);
      const errorObj = err as { response?: { status?: number }; code?: string; message?: string };
      
      if (errorObj.message?.includes('Invalid coin ID')) {
        error = 'Invalid coin ID. Please check the URL and try again.';
      } else if (errorObj.response?.status === 404) {
        error = 'Coin not found. Please check the URL and try again.';
      } else if (errorObj.response?.status === 429) {
        error = 'Rate limit exceeded. Please try again in a few minutes.';
      } else if (errorObj.code === 'ECONNREFUSED' || errorObj.code === 'ENOTFOUND') {
        error = 'Unable to connect to the API. Please check your internet connection.';
      } else {
        error = 'Failed to load coin details. Please try again.';
      }
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Markets</span>
        </Link>
      </div>

      {error ? (
        <div className="floating-card text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-400 rounded-full"></div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Oops! Something went wrong</h3>
          <p className="text-foreground/60 mb-6">{error}</p>
          <Link 
            href="/"
            className="btn-modern"
          >
            Back to Markets
          </Link>
        </div>
      ) : coin ? (
        <div className="flex justify-center">
          <Suspense fallback={<SkeletonLoader />}>
            <CoinCard coin={coin} />
          </Suspense>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}