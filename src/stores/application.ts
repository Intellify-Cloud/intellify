import type { ApplicationRef } from '@/types/app'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useApplicationStore = defineStore('application', () => {
  const applicationRefs = shallowRef<ApplicationRef[]>([])

  const addApplicationRef = (applicationRef: ApplicationRef) => {
    applicationRefs.value.push(applicationRef)
  }

  const removeApplicationRef = (name: string) => {
    applicationRefs.value = applicationRefs.value.filter((item) => item.name !== name)
  }

  const findApplicationRef = (name: string | undefined) => {
    return applicationRefs.value.find((item) => item.name === name)?.ref
  }

  return {
    applicationRefs,
    addApplicationRef,
    removeApplicationRef,
    findApplicationRef,
  }
})
