<template>
  <div class="flex flex-col gap-4 md:border-r-2">
    <h2 class="font-bold text-xl text-blue-950 dark:text-white">Variáveis de Ambiente</h2>
    <FormKit
      type="form"
      submit-label="Salvar"
      @submit="saveQuantum"
      :submit-attrs="{
        inputClass: 'bg-blue-800 rounded shadow-sm p-2 text-white'
      }"
    >
      <FormKit
        type="number"
        name="quantum"
        id="quantum"
        placeholder="10"
        min="0"
        validation="min:1|required"
        label="Quantum"
        input-class="bg-slate-200 dark:bg-slate-700 rounded shadow-sm p-2 w-full md:w-11/12"
        :value="store.quantum"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { FormKit } from '@formkit/vue'
import { useProcessStore } from '@/store/processStore'
import {useToastStore} from '@/store/toastStore'

const store = useProcessStore()
const toastStore = useToastStore()

function saveQuantum({ quantum }) {
  store.setQuantum(quantum)
  toastStore.setToast('Quantum salvo com sucesso!')
  console.log(toastStore.toast.message)
}
</script>
