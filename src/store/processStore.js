import { defineStore } from 'pinia'
import { executeRoundRobin } from '@/helpers/rr.js'

export const useProcessStore = defineStore('process', () => {
  return {
    processos: [
      {
        id: 1,
        nome: 'A',
        tempo: 6,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 2,
        nome: 'B',
        tempo: 8,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 3,
        nome: 'C',
        tempo: 4,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 4,
        nome: 'D',
        tempo: 2,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      }
    ],
    quantum: 2,
    tempoMediaEspera: 0,
    tempoMedioRetorno: 0,
    tempoTotalProcessador: 0,
    setQuantum(quantum) {
      this.quantum = quantum
    },
    addProcess(process) {
      process.id = this.processos.length + 1
      process.status = 'Pronto'
      process.tempoTurnaround = 0
      process.tempoEspera = 0
      this.processos.push(process)
    },
    removeProcess(process) {
      this.processos = this.processos.filter((p) => p !== process)
    },
    getProcess(id) {
      return this.processos.find((p) => p.id === id)
    },
    getProcesses() {
      return this.processos
    },
    clear() {
      this.processos = []
      this.tempoMediaEspera = 0
      this.tempoTotalProcessador = 0
      this.tempoMedioRetorno = 0
    },
    init() {
      const listaTempoExecucao = this.processos.map((p) => p.tempo)

      const result = executeRoundRobin(listaTempoExecucao, this.quantum).processos.map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          tempo: item.tempoExecucao,
          tempoEspera: item.tempoEspera,
          tempoTurnaround: item.tempoTurnaround,
          status: 'Concluído'
        }
      })

      this.processos = result

      this.tempoMediaEspera = (
        this.processos.reduce((acc, curr) => acc + curr.tempoEspera, 0) / this.processos.length
      ).toFixed(2)
      this.tempoMedioRetorno = (
        this.processos.reduce((acc, curr) => acc + curr.tempoTurnaround, 0) / this.processos.length
      ).toFixed(2)
      this.tempoTotalProcessador = this.processos
        .reduce((acc, curr) => acc + curr.tempo, 0)
        .toFixed(2)
    }
  }
})
