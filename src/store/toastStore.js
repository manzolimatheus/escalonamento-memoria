import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  return {
    toast: {
      show: false,
      message: '',
    },
    setToast(message) {
      this.toast.message = message
      this.toast.show = true
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    }
  }
})
