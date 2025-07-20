import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageBus = defineStore('message-bus', () => {
  const events = ref<{ [eventName: string]: Array<(payload?: unknown) => void> }>({})

  const emit = (event: string, payload?: unknown) => {
    if (!events.value[event]) return
    for (const cb of events.value[event]) {
      cb(payload)
    }
  }

  const on = (event: string, callback: (payload?: unknown) => void) => {
    if (!events.value[event]) {
      events.value[event] = []
    }
    events.value[event].push(callback)
  }

  const off = (event: string, callback: (payload?: unknown) => void) => {
    events.value[event] = events.value[event]?.filter((cb) => cb !== callback)
  }

  return { emit, on, off }
})
