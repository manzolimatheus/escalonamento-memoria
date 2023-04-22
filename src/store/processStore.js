import { defineStore } from 'pinia'

export const useProcessStore = defineStore('process', () => {
  return {
    processos: [
      {
        id: 1,
        nome: 'A',
        tempo: 6,
        tempoBase: 6,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 2,
        nome: 'B',
        tempoBase: 8,
        tempo: 8,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 3,
        nome: 'C',
        tempoBase: 4,
        tempo: 4,
        tempoTurnaround: 0,
        tempoEspera: 0,
        status: 'Pronto'
      },
      {
        id: 4,
        nome: 'D',
        tempoBase: 2,
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
    currentIndex: 1,
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
      this.currentIndex = 1
    },
    init() {
      let filtrado = this.processos.filter((processo) => processo.status !== 'Concluído')

      const interval = setInterval(() => {
        if (filtrado.length === 0) {
          clearInterval(interval)
          console.log('Todos os this.processos foram executados!')
          console.log('=====================================')
          console.log(this.processos)
          this.tempoMediaEspera =
            this.processos.reduce((acc, processo) => acc + processo.tempoEspera, 0) /
            this.processos.length

          this.tempoTotalProcessador = this.processos.reduce((acc, processo) => acc + processo.tempoBase, 0)

          this.tempoMedioRetorno =
            this.processos.reduce((acc, processo) => acc + processo.tempoTurnaround, 0) /
            this.processos.length

          return
        }

        // Encontre o processo atual pelo ID
        const processo =
          filtrado.find((processo) => processo.id === this.currentIndex) || filtrado[0]

        processo.status = 'Executando'

        // Atualize o tempo de turnaround do processo atual
        processo.tempoTurnaround += Math.min(processo.tempo, this.quantum)

        // Decresça o tempo restante do processo atual
        processo.tempo -= Math.min(processo.tempo, this.quantum)

        // Atualize o tempo de espera de outros this.processos
        this.processos.forEach((outroProcesso) => {
          if (outroProcesso.status === 'Pronto' && outroProcesso.id !== this.currentIndex) {
            const tempo = Math.min(outroProcesso.tempo, this.quantum)
            outroProcesso.tempoEspera += tempo
            outroProcesso.tempoTurnaround += tempo
          }
        })

        // Atualize o status do processo após o processamento
        processo.status = processo.tempo === 0 ? 'Concluído' : 'Pronto'
        this.processos[processo.id - 1] = processo

        // Atualize a lista de this.processos a serem filtrados
        filtrado = this.processos.filter((processo) => processo.status !== 'Concluído')
        this.currentIndex =
          filtrado.filter((processo) => processo.id > this.currentIndex)[0]?.id || 1
      }, 1000)
    }
  }
})
