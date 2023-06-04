import { defineStore } from 'pinia'
import FIFO from '../helpers/memory-fifo'

export const useProcessStore = defineStore('process', () => {
  return {
    qtdBlocos: 0,
    processos: [],
    historico: [],
    rawData: [],
    pageFaults: 0,
    saveConfig(qtdBlocos, processosString) {
      const processos = processosString.split(' ').map((processo) => Number(processo))

      this.processos = processos
      this.qtdBlocos = Number(qtdBlocos)
    },
    runFIFO() {
      const resposta = FIFO([...this.processos], this.qtdBlocos)

      this.rawData = resposta
      this.pageFaults = this.rawData.filter((obj) => obj.filter((item) => item.pageFault).length > 0).length

      const historicoFlat = resposta.flat(Infinity)

      const blocosMemoria = [...Array(this.qtdBlocos)].map((i, index) => ({
        bloco: index + 1,
        processos: historicoFlat.filter((item) => item.bloco == index + 1).map((item) => item.processo)
      }))

      this.historico = blocosMemoria
    },
    clear() {
      this.qtdBlocos = 0
      this.processos = []
      this.historico = []
      this.rawData = []
      this.pageFaults = 0
    }
  }
})
