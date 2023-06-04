<template>
  <div>
    <section class="overflow-auto rounded shadow-sm border-slate-400 border-2">
      <table class="shadow-sm w-max md:w-full">
        <thead class="bg-slate-300 dark:bg-slate-950">
          <tr class="text-start">
            <th>Ref</th>
            <th class="p-2" v-for="(processo, index) in store.processos" :key="index">
              {{ processo }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800 p-4 text-center">
          <tr v-for="(linha, index) in store.historico" :key="index">
            <td>{{ linha.bloco }}</td>
            <td v-for="(processo, index) in linha.processos" :key="index">
              {{ processo }}
            </td>
          </tr>
          <tr class="bg-slate-700">
            <td>Page Fault?</td>
            <td
              v-for="(linha, index) in store.rawData"
              :key="index"
              :class="linha.filter((item) => item.pageFault).length > 0 ? 'bg-green-500 border-2 border-green-800' : ''"
            >
              {{ linha.filter((item) => item.pageFault).length > 0 ? 'F' : '' }}
            </td>
          </tr>
          <tr>
            <td :colspan="Math.round(store.processos.length / 2) + 1" class="bg-slate-950">
              Total Page Fault
            </td>
            <td :colspan="Math.round(store.processos.length / 2) + 1" class="bg-slate-900">
              {{ store.pageFaults }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { useProcessStore } from '@/store/processStore'

const store = useProcessStore()
</script>
