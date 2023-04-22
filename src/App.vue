<script setup>
import { RouterView } from 'vue-router'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { onBeforeMount } from 'vue'
import { refreshTheme } from '@/helpers/theme'

onBeforeMount(() => {
  refreshTheme()
})

</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
