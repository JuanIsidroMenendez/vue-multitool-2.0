import { operate } from '../utils/operate.js'

describe('operate', () => {
  it('suma dos números', () => {
    expect(operate(7, 3, '+')).toBe(10)
  })

  it('resta dos números', () => {
    expect(operate(7, 3, '-')).toBe(4)
  })

  it('multiplica dos números', () => {
    expect(operate(7, 3, '*')).toBe(21)
  })

  it('divide dos números', () => {
    expect(operate(6, 3, '/')).toBe(2)
  })

  it('devuelve Error al dividir entre cero', () => {
    expect(operate(6, 0, '/')).toBe('Error')
  })

  it('devuelve el segundo operando si el operador no se reconoce', () => {
    expect(operate(7, 3, '?')).toBe(3)
  })
})