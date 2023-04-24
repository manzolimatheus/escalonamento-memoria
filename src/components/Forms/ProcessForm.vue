<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-bold text-xl text-blue-950 dark:text-white">Adicionar Processo</h2>
    <FormKit
      id="process-form"
      type="form"
      submit-label="Adicionar Processo"
      input-class="text-red"
      @submit="submitForm"
      :submit-attrs="{
        inputClass: 'bg-blue-800 rounded shadow-sm p-2 text-white'
      }"
    >
      <FormKit
        type="text"
        name="nome"
        id="nome"
        placeholder="Abrir Bloco de Notas"
        validation="required"
        label="Nome do Processo"
        input-class="bg-slate-200 dark:bg-slate-700 rounded shadow-sm p-2 w-full"
      />
      <FormKit
        type="number"
        name="tempo"
        id="tempo"
        placeholder="10"
        validation="min:1|required"
        label="Tempo do Processo"
        input-class="bg-slate-200 dark:bg-slate-700 rounded shadow-sm p-2 w-full"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { reset } from '@formkit/vue';
import { useProcessStore } from '@/store/processStore'

const store = useProcessStore()

import { useToastStore } from '@/store/toastStore'
const toastStore = useToastStore()

function submitForm({nome, tempo}) {
  reset('process-form')
  store.addProcess({nome, tempo: Number(tempo), tempoBase: Number(tempo)})
  toastStore.setToast('Processo adicionado com sucesso!')
}
</script>
