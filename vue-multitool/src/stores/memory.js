import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemoryStore = defineStore('memory', () => {
  const value = ref(null)

  function save(number) {
    value.value = number
  }

  function clear() {
    value.value = null
  }

  return { value, save, clear }
})