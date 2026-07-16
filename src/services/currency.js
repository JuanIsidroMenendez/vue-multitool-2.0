import axios from 'axios'

const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
const SUPPORTED = ['EUR', 'USD', 'JPY']

function mapRatesResponse(data) {
  const rates = {}
  for (const code of SUPPORTED) {
    rates[code] = parseFloat(data.rates[code])
  }
  return {
    base: data.base,
    updatedAt: data.date,
    rates
  }
}

export async function getCurrencyRates() {
  const response = await axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      symbols: SUPPORTED.join(',')
    }
  })
  return mapRatesResponse(response.data)
}