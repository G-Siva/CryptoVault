import axios from 'axios';
import { Coin, CoinDetails, MarketChart } from '@/lib/types';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000, // 10 second timeout
  // Remove API key requirement for public API access
  // headers: {
  //   'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
  // },
});

export const getCoinsMarkets = async (page: number = 1, perPage: number = 50, order: string = 'market_cap_desc'): Promise<Coin[]> => {
  const response = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order,
      per_page: perPage,
      page,
      sparkline: false,
    },
  });
  return response.data;
};

export const getCoinDetails = async (id: string): Promise<CoinDetails> => {
  try {
    console.log(`Fetching coin details for: ${id}`);
    
    // Validate coin ID
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid coin ID provided');
    }
    
    const response = await api.get(`/coins/${id}`);
    console.log('Coin details response:', response.data);
    
    // Validate response data
    if (!response.data || !response.data.id) {
      throw new Error('Invalid response from API');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching coin details for ${id}:`, error);
    throw error;
  }
};

export const getCoinMarketChart = async (id: string, days: string): Promise<MarketChart> => {
  const response = await api.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
    },
  });
  return response.data;
};