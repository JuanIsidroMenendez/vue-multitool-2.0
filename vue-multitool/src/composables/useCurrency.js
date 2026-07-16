import { ref } from 'vue'
import { getCurrencyRates } from '../services/currency.js'

export function useCurrency() {
  const rates = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const amount = ref('1')
  const from = ref('EUR')
  const to = ref('USD')
  const result = ref(null)

  async function loadRates() {
    loading.value = true
    error.value = null
    try {
      const data = await getCurrencyRates()
      rates.value = data.rates
    } catch (e) {
      error.value = 'No se pudieron cargar las tasas de cambio'
    } finally {
      loading.value = false
    }
  }

  function convert() {
    if (!rates.value) return
    const value = parseFloat(amount.value)
    if (isNaN(value)) {
      error.value = 'Introduce una cantidad válida'
      result.value = null
      return
    }
    error.value = null
    const rateFrom = rates.value[from.value]
    const rateTo = rates.value[to.value]
    result.value = (value / rateFrom * rateTo).toFixed(2)
  }

  return { rates, loading, error, amount, from, to, result, loadRates, convert }
}