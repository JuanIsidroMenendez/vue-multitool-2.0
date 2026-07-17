<script setup>
import { onMounted, watch } from 'vue'
import { useWeather } from '../composables/useWeather.js'
import { getSkyIconUrl } from '../services/weather.js'

const { data, loading, error, scope, loadWeather } = useWeather()

onMounted(loadWeather)
watch(scope, loadWeather)
</script>

<template>
  <section class="weather">
    <h2>El tiempo</h2>

    

    <p v-if="loading" class="msg">Cargando…</p>
    <p v-else-if="error" class="msg msg--error">{{ error }}</p>

    <ul v-else-if="data" class="cities">
      <li v-for="city in data.cities" :key="city.id" class="city">
        <img :src="getSkyIconUrl(city.skyId)" :alt="city.skyDescription" class="icon" />
        <div class="info">
          <span class="name">{{ city.name }}</span>
          <span class="sky">{{ city.skyDescription }}</span>
        </div>
        <span class="temps">{{ city.maxTemp }}° / {{ city.minTemp }}°</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.weather {
  max-width: 340px;
  margin: 2rem auto;
  padding: 1rem;
  background: #05040a;
  border: 2px solid #22d3ee;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.6),
              inset 0 0 12px rgba(34, 211, 238, 0.15);
}

h2 {
  margin: 0 0 1rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: 400;
  color: #a5f3fc;
  text-shadow: 0 0 10px rgba(34, 211, 238, 0.9);
}

.field {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #38bdf8;
  border-radius: 10px;
  color: #38bdf8;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.cities {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.city {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem;
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 10px;
}

.icon {
  width: 42px;
  height: 42px;
}

.info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.name {
  color: #a5f3fc;
  font-weight: 600;
}

.sky {
  font-size: 0.8rem;
  color: #64748b;
}

.temps {
  font-family: 'Courier New', monospace;
  color: #ec4899;
  text-shadow: 0 0 8px rgba(236, 72, 153, 0.7);
}

.msg {
  text-align: center;
  color: #94a3b8;
}

.msg--error {
  color: #f87171;
}
</style>