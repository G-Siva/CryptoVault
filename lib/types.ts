export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
}

export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: { 
    large: string;
    small: string;
    thumb: string;
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    total_supply: number | null;
    price_change_percentage_24h?: number;
    circulating_supply?: number;
    ath?: { usd: number };
    atl?: { usd: number };
    price_change_percentage_7d?: number;
  };
  market_cap_rank: number;
}

export interface MarketChart {
  prices: [number, number][];
}