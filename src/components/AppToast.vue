<template>
  <div
    class="bg-green-500 text-center p-4 text-white fixed bottom-0 right-0 mr-12 mb-12
    "
    v-show="toastStore.toast.show"
  >
    <p>{{ toastStore.toast.message }}</p>
  </div>
</template>

<script setup>
import { useToastStore } from '@/store/toastStore'
const toastStore = useToastStore()
</script>
