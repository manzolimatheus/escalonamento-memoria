<template>
  <header class="shadow-md sticky bg-white dark:bg-slate-950 dark:text-white">
    <div class="container mx-auto flex flex-wrap justify-between p-4 items-center">
      <RouterLink to="/" class="bg-white p-2 rounded-full">
        <img
          src="https://cdn-icons-png.flaticon.com/512/99/99173.png"
          alt="Logo ponteiro de mouse"
          width="25"
        />
      </RouterLink>
      <ul class="flex gap-6 items-center">
        <li v-for="route in routes" :key="route.path" class="flex items-center">
          <RouterLink :to="route.path" class="invisible sm:visible">{{
            route.meta.title
          }}</RouterLink>
          <RouterLink
            :to="route.path"
            class="visible sm:invisible text-2xl flex justify-center items-center"
            ><ion-icon :name="route.meta.icon"></ion-icon
          ></RouterLink>
        </li>
      </ul>
      <ThemeMode />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { routes } from '@/router'
import ThemeMode from './ThemeMode.vue'
</script>
