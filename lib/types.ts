export interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number | null
  market_cap: number
  total_volume: number
  market_cap_rank: number
  // Additional properties commonly used
  circulating_supply?: number
  total_supply?: number | null
  max_supply?: number | null
  ath?: number
  ath_change_percentage?: number
  ath_date?: string
  atl?: number
  atl_change_percentage?: number
  atl_date?: string
  last_updated?: string
  // Price change percentages for different time periods
  price_change_percentage_1h?: number | null
  price_change_percentage_7d?: number | null
  price_change_percentage_30d?: number | null
  price_change_percentage_1y?: number | null
  // Volume and market data
  price_change_24h?: number | null
  market_cap_change_24h?: number | null
  market_cap_change_percentage_24h?: number | null
  fully_diluted_valuation?: number | null
}

export interface CoinDetails {
  id: string
  name: string
  symbol: string
  image: {
    large: string
    small: string
    thumb: string
  }
  market_data: {
    current_price: { usd: number }
    market_cap: { usd: number }
    total_volume: { usd: number }
    total_supply: number | null
    price_change_percentage_24h?: number
    circulating_supply?: number
    ath?: { usd: number }
    atl?: { usd: number }
    price_change_percentage_7d?: number
    // Additional market data
    max_supply?: number | null
    ath_change_percentage?: { usd: number }
    ath_date?: { usd: string }
    atl_change_percentage?: { usd: number }
    atl_date?: { usd: string }
    price_change_percentage_1h?: number
    price_change_percentage_30d?: number
    price_change_percentage_1y?: number
    market_cap_change_24h?: { usd: number }
    market_cap_change_percentage_24h?: number
    price_change_24h?: { usd: number }
    fully_diluted_valuation?: { usd: number | null }
    high_24h?: { usd: number }
    low_24h?: { usd: number }
  }
  market_cap_rank: number
  // Additional coin details
  description?: {
    en: string
  }
  links?: {
    homepage?: string[]
    blockchain_site?: string[]
    official_forum_url?: string[]
    chat_url?: string[]
    announcement_url?: string[]
    twitter_screen_name?: string
    facebook_username?: string
    telegram_channel_identifier?: string
    subreddit_url?: string
    repos_url?: {
      github?: string[]
      bitbucket?: string[]
    }
  }
  categories?: string[]
  last_updated?: string
  // Community and developer data
  community_data?: {
    facebook_likes?: number | null
    twitter_followers?: number | null
    reddit_average_posts_48h?: number | null
    reddit_average_comments_48h?: number | null
    reddit_subscribers?: number | null
    reddit_accounts_active_48h?: number | null
    telegram_channel_user_count?: number | null
  }
  developer_data?: {
    forks?: number | null
    stars?: number | null
    subscribers?: number | null
    total_issues?: number | null
    closed_issues?: number | null
    pull_requests_merged?: number | null
    pull_request_contributors?: number | null
    code_additions_deletions_4_weeks?: {
      additions?: number | null
      deletions?: number | null
    }
    commit_count_4_weeks?: number | null
    last_4_weeks_commit_activity_series?: number[]
  }
}

export interface MarketChart {
  prices: [number, number][]
  market_caps?: [number, number][]
  total_volumes?: [number, number][]
}

// Additional utility types
export interface CoinSearchResult {
  id: string
  name: string
  symbol: string
  market_cap_rank: number | null
  thumb: string
  large: string
}

export interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number
  }
}

export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number
    upcoming_icos: number
    ongoing_icos: number
    ended_icos: number
    markets: number
    total_market_cap: { [key: string]: number }
    total_volume: { [key: string]: number }
    market_cap_percentage: { [key: string]: number }
    market_cap_change_percentage_24h_usd: number
    updated_at: number
  }
}

// API Response types
export interface CoinGeckoResponse<T> {
  data: T
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
  }
}

// Error types
export interface APIError {
  code: string
  message: string
  status?: number
  response?: {
    data?: unknown
    status?: number
  }
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// Chart data types for different time periods
export type ChartPeriod = "1" | "7" | "14" | "30" | "90" | "180" | "365" | "max"

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    fill?: boolean
  }[]
}

// Price alert types
export interface PriceAlert {
  id: string
  coin_id: string
  target_price: number
  condition: "above" | "below"
  is_active: boolean
  created_at: string
  triggered_at?: string
}

// Portfolio types
export interface PortfolioHolding {
  id: string
  coin_id: string
  amount: number
  average_buy_price: number
  current_value: number
  profit_loss: number
  profit_loss_percentage: number
  last_updated: string
}

export interface Portfolio {
  id: string
  name: string
  holdings: PortfolioHolding[]
  total_value: number
  total_profit_loss: number
  total_profit_loss_percentage: number
  created_at: string
  updated_at: string
}
