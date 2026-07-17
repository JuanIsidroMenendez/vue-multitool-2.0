import { ref } from 'vue'
import { getProvinceWeather, getNationalWeather } from '../services/weather.js'

export function useWeather() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const scope = ref('province')

  async function loadWeather() {
    loading.value = true
    error.value = null
    try {
      data.value = scope.value === 'national'
        ? await getNationalWeather()
        : await getProvinceWeather()
    } catch (e) {
      error.value = 'No se pudo cargar la información del tiempo'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, scope, loadWeather }
}