import axios from 'axios';

const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest';  
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export async function getCurrencyRates() {
  const response = await axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      symbols: 'EUR,JPY,USD'
    }
  })
  return response.data.rates
}