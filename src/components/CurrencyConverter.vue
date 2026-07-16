<script setup>
import { onMounted } from 'vue'
import { useCurrency } from '../composables/useCurrency.js'

const {
  loading,
  error,
  amount,
  from,
  to,
  result,
  loadRates,
  convert
} = useCurrency()

onMounted(loadRates)
</script>

<template>
  <section class="converter">
    <h2>Conversor de divisas</h2>

    <p v-if="loading" class="msg">Cargando tasas…</p>
    <p v-else-if="error" class="msg msg--error">{{ error }}</p>

    <div class="form">
      <input v-model="amount" type="number" class="field" placeholder="Cantidad" />

      <select v-model="from" class="field">
        <option value="EUR">€ EUR</option>
        <option value="USD">$ USD</option>
        <option value="JPY">¥ JPY</option>
      </select>

      <select v-model="to" class="field">
        <option value="EUR">€ EUR</option>
        <option value="USD">$ USD</option>
        <option value="JPY">¥ JPY</option>
      </select>

      <button class="btn" :disabled="loading" @click="convert">Convertir</button>
    </div>

    <p v-if="result !== null" class="result">{{ result }} {{ to }}</p>
  </section>
</template>

<style scoped>
.converter {
  max-width: 340px;
  margin: 2rem auto;
  padding: 1rem;
  background: #05040a;
  border: 2px solid #a855f7;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.6),
              inset 0 0 12px rgba(168, 85, 247, 0.15);
}

h2 {
  margin: 0 0 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: 400;
  color: #d8b4fe;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.9);
}

.form {
  display: grid;
  gap: 0.6rem;
}

.field {
  padding: 0.8rem;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #38bdf8;
  border-radius: 10px;
  color: #38bdf8;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.btn {
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #22c55e;
  border-radius: 10px;
  color: #22c55e;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.msg {
  text-align: center;
  color: #94a3b8;
}

.msg--error {
  color: #f87171;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.7);
}

.result {
  margin-top: 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: #22d3ee;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.9);
}
</style>