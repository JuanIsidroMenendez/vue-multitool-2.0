import axios from 'axios'

const API_URL = 'https://api.el-tiempo.net/json/v3/provincias'
const ASTURIAS_CODE = '33'
const ICON_URL = 'https://www.aemet.es/imagenes_gcd/_iconos_municipios'

export function mapCity(city) {
  return {
    id: city.id['0'],
    name: city.name,
    province: city.nameProvince,
    skyId: city.stateSky.id,
    skyDescription: city.stateSky.description,
    maxTemp: parseInt(city.temperatures.max, 10),
    minTemp: parseInt(city.temperatures.min, 10)
  }
}


export function getSkyIconUrl(skyId) {
  return `${ICON_URL}/${skyId}.png`
}

export async function getProvinceWeather(code = ASTURIAS_CODE) {
  const response = await axios.get(`${API_URL}/${code}`)
  return {
    scope: response.data.provincia.NOMBRE_PROVINCIA,
    cities: response.data.ciudades.map(mapCity)
  }
}

export async function getNationalWeather() {
  const response = await axios.get(API_URL)
  return {
    scope: 'España',
    cities: response.data.ciudades.map(mapCity)
  }
}