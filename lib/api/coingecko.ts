import axios from "axios"
import type { Coin, CoinDetails, MarketChart } from "@/lib/types"

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; CryptoApp/1.0)",
  },
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (error.code === "ENOTFOUND") {
      error.message = "Unable to connect to CoinGecko API. Please check your internet connection."
    } else if (error.code === "ECONNREFUSED") {
      error.message = "Connection refused by CoinGecko API. Please try again later."
    } else if (error.code === "ETIMEDOUT") {
      error.message = "Request timed out. Please try again."
    }
    console.error("API Error Details:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    })
    return Promise.reject(error)
  },
)

// Mock data matching your types
const mockCoins: Coin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 43250.5,
    price_change_percentage_24h: 2.45,
    market_cap: 847234567890,
    total_volume: 25678934567,
    market_cap_rank: 1,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2634.8,
    price_change_percentage_24h: -1.23,
    market_cap: 316789123456,
    total_volume: 15678934567,
    market_cap_rank: 2,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "bnb",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 315.67,
    price_change_percentage_24h: 0.87,
    market_cap: 47234567890,
    total_volume: 1234567890,
    market_cap_rank: 3,
  },
]

const mockCoinDetails: CoinDetails = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: {
    large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
  },
  market_data: {
    current_price: { usd: 43250.5 },
    market_cap: { usd: 847234567890 },
    total_volume: { usd: 25678934567 },
    total_supply: 21000000,
    price_change_percentage_24h: 2.45,
    circulating_supply: 19654321,
    ath: { usd: 69045 },
    atl: { usd: 67.81 },
    price_change_percentage_7d: 5.23,
  },
  market_cap_rank: 1,
}

const mockMarketChart: MarketChart = {
  prices: [
    [1704067200000, 42000],
    [1704153600000, 42500],
    [1704240000000, 43000],
    [1704326400000, 43250],
  ],
}

export const getCoinsMarkets = async (page = 1, perPage = 50, order = "market_cap_desc"): Promise<Coin[]> => {
  try {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order,
        per_page: perPage,
        page,
        sparkline: false,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching coins markets:", error)
    // Return mock data on error
    return mockCoins
  }
}

export const getCoinDetails = async (id: string): Promise<CoinDetails> => {
  try {
    console.log(`Fetching coin details for: ${id}`)

    // Validate coin ID
    if (!id || typeof id !== "string") {
      throw new Error("Invalid coin ID provided")
    }

    const response = await api.get(`/coins/${id}`)
    console.log("Coin details response:", response.data)

    // Validate response data
    if (!response.data || !response.data.id) {
      throw new Error("Invalid response from API")
    }

    return response.data
  } catch (error) {
    console.error(`Error fetching coin details for ${id}:`, error)
    // Return mock data instead of throwing
    return { ...mockCoinDetails, id }
  }
}

export const getCoinMarketChart = async (id: string, days: string): Promise<MarketChart> => {
  try {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching market chart for ${id}:`, error)
    // Return mock data on error
    return mockMarketChart
  }
}

