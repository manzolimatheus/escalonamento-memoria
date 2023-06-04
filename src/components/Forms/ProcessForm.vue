<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-bold text-xl text-blue-950 dark:text-white">Adicionar Processo</h2>
    <FormKit
      id="process-form"
      type="form"
      submit-label="Salvar"
      input-class="text-red"
      @submit="submitForm"
      :submit-attrs="{
        inputClass: 'bg-blue-800 rounded shadow-sm p-2 text-white'
      }"
    >
      <FormKit
        type="number"
        name="qtdBlocos"
        id="qtdBlocos"
        placeholder="4"
        validation="required"
        label="Quantidade de Páginas"
        input-class="bg-slate-200 dark:bg-slate-700 rounded shadow-sm p-2 w-full"
        :value="store.qtdBlocos"
      />
      <FormKit
        type="text"
        name="processos"
        id="processos"
        placeholder="10"
        validation="required"
        label="Processos (Separados por espaço)"
        input-class="bg-slate-200 dark:bg-slate-700 rounded shadow-sm p-2 w-full"
        :value="store.processos.join(' ')"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { useProcessStore } from '@/store/processStore'

const store = useProcessStore()

import { useToastStore } from '@/store/toastStore'
const toastStore = useToastStore()

function submitForm({ qtdBlocos, processos }) {
  store.saveConfig(qtdBlocos, processos)
  toastStore.setToast('Processo adicionado com sucesso!')
}
</script>
