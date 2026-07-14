import { ref } from 'vue'
import { operate } from '../utils/operate.js'

export function useCalculator() {
  const display = ref('0')
  const stored = ref(null)
  const operator = ref(null)
  const waitingForOperand = ref(false)

  function inputDigit(digit) {
    if (waitingForOperand.value) {
      display.value = digit
      waitingForOperand.value = false
    } else {
      display.value = display.value === '0' ? digit : display.value + digit
    }
  }

  function inputDecimal() {
    if (waitingForOperand.value) {
      display.value = '0.'
      waitingForOperand.value = false
      return
    }
    if (!display.value.includes('.')) {
      display.value = display.value + '.'
    }
  }

  function chooseOperator(nextOperator) {
    const current = parseFloat(display.value)

    if (stored.value === null) {
      stored.value = current
    } else if (operator.value) {
      const result = operate(stored.value, current, operator.value)
      display.value = String(result)
      stored.value = result === 'Error' ? null : result
    }

    operator.value = nextOperator
    waitingForOperand.value = true
  }

  function equals() {
    if (operator.value === null || stored.value === null) return
    const current = parseFloat(display.value)
    const result = operate(stored.value, current, operator.value)
    display.value = String(result)
    stored.value = null
    operator.value = null
    waitingForOperand.value = true
  }

  function clear() {
    display.value = '0'
    stored.value = null
    operator.value = null
    waitingForOperand.value = false
  }

  return { display, inputDigit, inputDecimal, chooseOperator, equals, clear }
}