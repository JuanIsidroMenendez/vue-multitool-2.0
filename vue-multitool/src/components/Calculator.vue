<script setup>
import { useCalculator } from '../composables/useCalculator.js'

const {
  display,
  inputDigit,
  inputDecimal,
  chooseOperator,
  equals,
  clear,
  memoryAdd,
  memoryRecall,
  memoryClear
} = useCalculator()
</script>

<template>
  <section class="calculator">
    <div class="display">{{ display }}</div>

    <div class="keypad keypad--memory">
      <button class="key key--mem" @click="memoryAdd">M+</button>
      <button class="key key--mem" @click="memoryRecall">MR</button>
      <button class="key key--mem" @click="memoryClear">MC</button>
    </div>

    <div class="keypad">
      <button class="key key--clear" @click="clear">CE</button>
      <button class="key key--op" @click="chooseOperator('/')">÷</button>

      <button class="key" @click="inputDigit('7')">7</button>
      <button class="key" @click="inputDigit('8')">8</button>
      <button class="key" @click="inputDigit('9')">9</button>
      <button class="key key--op" @click="chooseOperator('*')">×</button>

      <button class="key" @click="inputDigit('4')">4</button>
      <button class="key" @click="inputDigit('5')">5</button>
      <button class="key" @click="inputDigit('6')">6</button>
      <button class="key key--op" @click="chooseOperator('-')">−</button>

      <button class="key" @click="inputDigit('1')">1</button>
      <button class="key" @click="inputDigit('2')">2</button>
      <button class="key" @click="inputDigit('3')">3</button>
      <button class="key key--op" @click="chooseOperator('+')">+</button>

      <button class="key key--zero" @click="inputDigit('0')">0</button>
      <button class="key" @click="inputDecimal">.</button>
      <button class="key key--equals" @click="equals">=</button>
    </div>
  </section>
</template>

<style scoped>
.calculator {
  max-width: 320px;
  margin: 0 auto;
  padding: 1rem;
}

.display {
  background: #1e1e1e;
  color: #fff;
  font-size: 2rem;
  text-align: right;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  white-space: nowrap;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.keypad--memory {
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 0.5rem;
}

.key {
  padding: 1rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background: #e0e0e0;
  cursor: pointer;
}

.key:active { transform: scale(0.97); }

.key--op { background: #ffb74d; }
.key--equals { background: #4caf50; color: #fff; }
.key--clear { background: #ef5350; color: #fff; grid-column: span 3; }
.key--zero { grid-column: span 2; }
.key--mem { background: #90a4ae; color: #fff; font-size: 1rem; }
</style>