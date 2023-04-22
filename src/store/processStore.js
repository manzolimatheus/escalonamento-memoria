import { defineStore } from 'pinia'

export const useProcessStore = defineStore('process', () => {
  return {
    processos: [
      {
        nome: 'P1',
        tempo: 6,
        tempoTurnaround: 20,
        tempoEspera: 12,
        status: 'Pronto'
      },
      {
        nome: 'P2',
        tempo: 8,
        tempoTurnaround: 5,
        tempoEspera: 6,
        status: 'Pronto'
      },
      {
        nome: 'P3',
        tempo: 7,
        tempoTurnaround: 3,
        tempoEspera: 10,
        status: 'Pronto'
      },
      {
        nome: 'Abrir discord',
        tempo: 2,
        tempoTurnaround: 3,
        tempoEspera: 1,
        status: 'Pronto'
      }
    ],
    quantum: 2,
    tempoMediaEspera: 0,
    tempoTotalProcessador: 0,
    setQuantum(quantum) {
      this.quantum = quantum
    },
    addProcess(process) {
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
      this.quantum = 0
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async init() {
      let contador = this.processos.length
      let ordem_execucao = []
      let tempos_processsos = []
      let tempo_espera_total = 0
      let tempo_turnaround_total = 0

      for (let i = 0; i < this.processos.length; i++) {
        tempos_processsos.push(this.processos[i].tempo)
      }

      while (contador > 0) {
        for (let i = 0; i < this.processos.length; i++) {
          await this.sleep(1000)
          if (
            this.processos[i].tempo > 0 &&
            (this.processos[i].status == 'Pronto' || this.processos[i].status == 'Executando')
          ) {
            this.processos[i].status = 'Executando'
            ordem_execucao.push(this.processos[i].nome)
            let tempo_espera = tempo_espera_total
            let tempo_turnaround = tempo_turnaround_total
            for (let j = 0; j < ordem_execucao.length - 1; j++) {
              if (ordem_execucao[j] === this.processos[i].nome) {
                tempo_espera += tempos_processsos[i] * (j + 1)
                tempo_turnaround += tempos_processsos[i] * (j + 1)
                console.log('aaa ' + tempo_turnaround)
              } else {
                tempo_espera += tempos_processsos[j]
                tempo_turnaround += tempos_processsos[j + 1] + tempos_processsos[i]
              }
            }
            this.processos[i].tempoTurnaround =
              this.processos[i - 1] == undefined
                ? 0 + tempos_processsos[i]
                : this.processos[i - 1].tempoTurnaround + tempos_processsos[i]
            this.processos[i].tempoEspera =
              this.processos[i - 1] == undefined
                ? 0
                : this.processos[i - 1].tempoEspera + tempos_processsos[i - 1]
            console.log(tempos_processsos[i])
            if (this.processos[i].tempo > this.quantum) {
              this.processos[i].tempo -= this.quantum
              tempo_espera_total += this.quantum
            } else {
              this.processos[i].status = 'Concluído'
              this.processos[i].tempo -= this.quantum
              if (this.processos[i].tempo < 0) {
                this.processos[i].tempo = 0
              }
              tempo_espera_total += this.processos[i].tempoEspera
              tempo_turnaround_total += this.processos[i].tempoTurnaround
              contador--
            }
          }
          console.log('-------------------------------------------------------------')
          console.log(this.processos)
        }
      }
    }
  }
})
