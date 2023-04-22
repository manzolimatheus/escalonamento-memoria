<template>
  <div>
    <section id="charts" class="grid grid-cols-1 md:grid-cols-2 my-6 overflow-auto">
      <Bar
        id="my-chart-id"
        :options="charts.chartOptions"
        :data="charts.awaitingChart"
        :height="300"
        class="w-full"
      />
      <Bar
        id="my-chart-id"
        :options="charts.chartOptions"
        :data="charts.turnaroundChart"
        :height="300"
        class="w-full"
      />
    </section>
    <section class="overflow-auto rounded shadow-sm border-slate-400 border-2">
      <table class="shadow-sm w-max md:w-full">
        <thead class="bg-slate-300 dark:bg-slate-950">
          <tr class="text-start">
            <th class="p-2">Ordem</th>
            <th class="p-2">Nome</th>
            <th class="p-2">Status</th>
            <th class="p-2">Tempo restante</th>
            <th class="p-2">Tempo de espera</th>
            <th class="p-2">Tempo de turnaround</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800 p-4">
          <tr
            v-for="(process, index) in store.getProcesses()"
            :key="process.id"
            :class="`border-b-2 border-slate-500 text-center ${
              store.currentIndex - 1 === index ? 'bg-blue-500' : ''
            }`"
          >
            <td class="p-2">{{ process.id }}</td>
            <td class="p-2">{{ process.nome }}</td>
            <td class="p-2">
              <div v-show="process.status === 'Pronto'">
                <span
                  class="bg-transparent border-green-500 border-2 rounded-full px-2 py-1 text-xs font-bold"
                >
                  <span class="animate-pulse">🟢</span> {{ process.status }}
                </span>
              </div>
              <div v-show="process.status === 'Executando'">
                <span
                  class="bg-transparent border-blue-500 border-2 rounded-full px-2 py-1 text-xs font-bold"
                >
                  <span class="animate-pulse">🔵</span> {{ process.status }}
                </span>
              </div>
              <div v-show="process.status === 'Concluído'">
                <span class="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                  {{ process.status }}
                </span>
              </div>
            </td>
            <td class="p-2">{{ process.tempo }}</td>
            <td class="p-2">{{ process.tempoEspera || 0 }}</td>
            <td class="p-2">{{ process.tempoTurnaround || 0 }}</td>
          </tr>
          <tr class="bg-slate-300 dark:bg-slate-950 p-2 text-center font-bold">
            <td colspan="2" class="p-2">Tempo Médio de espera</td>
            <td colspan="2" class="p-2">Tempo Médio de retorno</td>
            <td colspan="2" class="p-2">Tempo de processador</td>
          </tr>
          <tr>
            <td colspan="2" class="text-center p-2">{{ store.tempoMediaEspera }}</td>
            <td colspan="2" class="text-center p-2">{{ store.tempoMedioRetorno }}</td>
            <td colspan="2" class="text-center p-2">{{ store.tempoTotalProcessador }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProcessStore } from '@/store/processStore'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { Bar } from 'vue-chartjs'

const store = useProcessStore()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const charts = computed(() => {
  return {
    awaitingChart: {
      labels: store.processos.map((processo) => processo.nome),
      scale: 10,
      datasets: [
        {
          label: 'Tempo de Espera',
          backgroundColor: '#f87979',
          data: store.processos.map((processo) => processo.tempoEspera)
        }
      ]
    },
    turnaroundChart: {
      labels: store.processos.map((processo) => processo.nome),
      datasets: [
        {
          label: 'Tempo de Turnaround',
          backgroundColor: '#457be5',
          data: store.processos.map((processo) => processo.tempoTurnaround)
        }
      ]
    },
    chartOptions: {
      responsive: false
    }
  }
})
</script>
