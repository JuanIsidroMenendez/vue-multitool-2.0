import { mapCity, getSkyIconUrl } from '../services/weather.js'

describe('mapCity', () => {
  const rawCity = {
    id: { '0': '33044' },
    idProvince: '33',
    name: 'Oviedo',
    nameProvince: 'Asturias',
    stateSky: { description: 'Muy nuboso con tormenta', id: '53' },
    temperatures: { max: '25', min: '18' }
  }

  it('aplana el id anidado', () => {
    expect(mapCity(rawCity).id).toBe('33044')
  })

  it('convierte las temperaturas a números', () => {
    const city = mapCity(rawCity)
    expect(city.maxTemp).toBe(25)
    expect(city.minTemp).toBe(18)
  })

  it('extrae los campos de stateSky', () => {
    const city = mapCity(rawCity)
    expect(city.skyId).toBe('53')
    expect(city.skyDescription).toBe('Muy nuboso con tormenta')
  })
})

describe('getSkyIconUrl', () => {
  it('construye la URL del icono con el código del cielo', () => {
    expect(getSkyIconUrl('53')).toContain('/53.png')
  })
})