<template>
  <div class="p-12 flex flex-col gap-4">
    <section class="flex gap-4 overflow-auto">
      <button
        class="dark:text-white bg-transparent border-green-500 border-2 rounded px-2 py-1 text-2xl font-bold hover:bg-green-500 flex gap-4 items-center"
        @click="store.init"
      >
        <ion-icon name="play-circle-outline"></ion-icon>
        <span>Executar</span>
      </button>
      <button
        class="dark:text-white bg-transparent border-red-500 border-2 rounded px-2 py-1 text-2xl font-bold hover:bg-red-500 flex gap-4 items-center"
        @click="store.clear"
      >
        <ion-icon name="trash-bin-outline"></ion-icon>
        <span>Resetar</span>
      </button>
    </section>
    <!-- SETUP -->
    <section>
      <AccordionContainer>
        <template v-slot:title>
          <h1 class="font-bold text-2xl text-blue-950 dark:text-white">
            <ion-icon name="settings-outline"></ion-icon> <span>Setup</span>
          </h1>
        </template>
        <template v-slot:content>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section class="flex flex-col gap-4 md:col-span-1">
              <QuantumForm />
            </section>
            <!-- Processos -->
            <section class="flex flex-col gap-4 md:col-span-2">
              <ProcessForm />
            </section>
          </div>
        </template>
      </AccordionContainer>
    </section>
    <!-- Processos -->
    <section>
      <AccordionContainer>
        <template v-slot:title>
          <h1 class="font-bold text-2xl text-blue-950 dark:text-white">
            <ion-icon name="settings-outline"></ion-icon> <span>Processos</span>
          </h1>
        </template>
        <template v-slot:content>
          <span v-show="store.processos.length === 0">Nenhum processo na fila no momento.</span>
          <ProcessesTable v-show="store.processos.length > 0" />
        </template>
      </AccordionContainer>
    </section>
  </div>
</template>

<script setup>
import QuantumForm from '@/components/Forms/QuantumForm.vue'
import ProcessForm from '@/components/Forms/ProcessForm.vue'
import AccordionContainer from '@/components/AccordionContainer.vue'
import ProcessesTable from '@/components/ProcessesTable.vue'
import { useProcessStore } from '@/store/processStore'

const store = useProcessStore()
</script>
