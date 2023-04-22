<template>
  <div>
    <button
      class="flex align-center gap-4 py-4 cursor-pointer bg-white dark:bg-slate-800 p-4 rounded shadow-sm dark:hover:bg-slate-700 hover:bg-slate-200 w-full"
      @click="toggleCollapse"
    >
      <span class="text-2xl">{{ isCollapsed ? '+' : '-' }}</span>
      <slot name="title" />
    </button>
    <section v-show="!isCollapsed" class="mt-6">
      <slot name="content" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>
