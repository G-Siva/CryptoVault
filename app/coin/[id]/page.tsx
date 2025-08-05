import { Suspense } from "react"

// Fix for the text-foreground/60 class - use text-muted-foreground instead
interface CoinDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function CoinDetailsPage({ params }: CoinDetailsPageProps) {
  // Fix for Next.js 15 - params is now a Promise and needs to be awaited
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<CoinDetailsSkeleton />}>
          <CoinDetails coinId={id} />
        </Suspense>
      </div>
    </div>
  )
}

function CoinDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

async function CoinDetails({ coinId }: { coinId: string }) {
  // Your coin details logic here
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{coinId.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Coin Details</h1>
          {/* Fixed: Use text-muted-foreground instead of text-foreground/60 */}
          <p className="text-muted-foreground">ID: {coinId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-foreground">Price</h3>
          <p className="text-2xl font-bold text-green-600">$0.00</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-foreground">Market Cap</h3>
          <p className="text-2xl font-bold text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  )
}
