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
  max-width: 340px;
  margin: 0 auto;
  padding: 1rem;
  background: #05040a;
  border-radius: 12px;
}

.display {
  background: #07060f;
  color: #22d3ee;
  font-family: 'Courier New', monospace;
  font-size: 2.75rem;
  text-align: right;
  padding: 1.25rem 1rem;
  border: 2px solid #22d3ee;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  white-space: nowrap;
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.7),
              inset 0 0 12px rgba(34, 211, 238, 0.25);
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.9);
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

.keypad--memory {
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 0.6rem;
}

.key {
  padding: 1.1rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #38bdf8;
  border-radius: 12px;
  color: #38bdf8;
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.05s;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.5),
              inset 0 0 8px rgba(56, 189, 248, 0.15);
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
}

.key:hover {
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.9),
              inset 0 0 12px rgba(56, 189, 248, 0.3);
}

.key:active {
  transform: scale(0.96);
}

.key--mem {
  font-size: 1.1rem;
}

.key--op {
  border-color: #ec4899;
  color: #ec4899;
  box-shadow: 0 0 8px rgba(236, 72, 153, 0.5),
              inset 0 0 8px rgba(236, 72, 153, 0.15);
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.8);
}

.key--op:hover {
  box-shadow: 0 0 16px rgba(236, 72, 153, 0.9),
              inset 0 0 12px rgba(236, 72, 153, 0.3);
}

.key--clear {
  grid-column: span 3;
  border-color: #f0338d;
  color: #f0338d;
  box-shadow: 0 0 8px rgba(240, 51, 141, 0.5),
              inset 0 0 8px rgba(240, 51, 141, 0.15);
  text-shadow: 0 0 8px rgba(240, 51, 141, 0.8);
}

.key--clear:hover {
  box-shadow: 0 0 16px rgba(240, 51, 141, 0.9),
              inset 0 0 12px rgba(240, 51, 141, 0.3);
}

.key--equals {
  border-color: #22c55e;
  color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5),
              inset 0 0 8px rgba(34, 197, 94, 0.15);
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
}

.key--equals:hover {
  box-shadow: 0 0 16px rgba(34, 197, 94, 0.9),
              inset 0 0 12px rgba(34, 197, 94, 0.3);
}

.key--zero {
  grid-column: span 2;
}
</style>