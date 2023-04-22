<template>
  <div class="bg-slate-100 dark:bg-slate-900 dark:text-slate-300">
    <AppHeader />
    <AppToast />
    <main class="min-h-screen container mx-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppToast from '../AppToast.vue'
</script>
