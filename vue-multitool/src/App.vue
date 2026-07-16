<script setup>
import Calculator from './components/Calculator.vue'
import CurrencyConverter from './components/CurrencyConverter.vue'

</script>

<template>
  <main>
    <h1>Cyberpunk Multitool</h1>
    <Calculator />
    <CurrencyConverter />
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

