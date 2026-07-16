<script setup>
import Calculator from './components/Calculator.vue'

import { getCurrencyRates } from './services/currency.js'
getCurrencyRates().then(rates => console.log(rates))

</script>

<template>
  <main>
    <h1>Cyberpunk Multitool</h1>
    <Calculator />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-weight: 400;
  font-size: 3rem;
  letter-spacing: 3px;
  color: #f0abfc;
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.9),
               0 0 20px rgba(236, 72, 153, 0.7),
               0 0 40px rgba(168, 85, 247, 0.5);
}
</style>

