/**
 * Função para executar o algoritmo de escalonamento Round Robin preemptivo
 * @param {Array<Number>} tempoChegada
 * @param {Array<Number>} tempoExecucao
 * @param {Number} quantum
 * @returns {List<{id: Number, nome: String, at: Number, tempoExecucao: Number, tempoEspera: Number, tempoTurnaround: Number }>}
 */
export function executeRoundRobin(tempoExecucao, quantum) {
  /**
   * Mapeamento e ordenação de processos pelo tempo de chegada
   * Neste caso, o tempo de chegada é pré-configurado 0 para todos os processos
   */
  const infoProcessos = tempoExecucao
    .map(() => 0)
    .map((item, index) => {
      return {
        id: index + 1,
        nome: (index + 10).toString(36).toUpperCase(),
        at: item,
        tempoExecucao: Number(tempoExecucao[index])
      }
    })
    .sort((obj1, obj2) => {
      if (obj1.at > obj2.at) return 1
      if (obj1.at < obj2.at) return -1
      return 0
    })

  const processos = []

  const filaPronto = []
  let tempoAtual = infoProcessos[0].at
  const processosInacabados = [...infoProcessos]

  const tempoRestante = infoProcessos.reduce((acc, process) => {
    acc[process.nome] = process.tempoExecucao
    return acc
  }, {})

  filaPronto.push(processosInacabados[0])
  while (
    Object.values(tempoRestante).reduce((acc, cur) => {
      return acc + cur
    }, 0) &&
    processosInacabados.length > 0
  ) {
    if (filaPronto.length === 0 && processosInacabados.length > 0) {
      // Anteriormente parado (idle)
      filaPronto.push(processosInacabados[0])
      tempoAtual = filaPronto[0].at
    }

    const processoAtual = filaPronto[0]

    if (tempoRestante[processoAtual.nome] <= quantum) {
      // Tempo restante menor ou igual ao quantum, execute até acabar
      const remainingT = tempoRestante[processoAtual.nome]
      tempoRestante[processoAtual.nome] -= Number(remainingT)
      tempoAtual += Number(remainingT)
    } else {
      tempoRestante[processoAtual.nome] -= Number(quantum)
      tempoAtual += Number(quantum)
    }
    const processToArriveInThisCycle = infoProcessos.filter((p) => {
      return (
        p.at <= tempoAtual &&
        p !== processoAtual &&
        !filaPronto.includes(p) &&
        processosInacabados.includes(p)
      )
    })

    // Adicionando processo para fila de pronto
    filaPronto.push(...processToArriveInThisCycle)

    // Realocando na fila
    filaPronto.push(filaPronto.shift())

    // Quando o processo é finalizado
    if (tempoRestante[processoAtual.nome] === 0) {
      const indexToRemoveUJ = processosInacabados.indexOf(processoAtual)
      if (indexToRemoveUJ > -1) {
        processosInacabados.splice(indexToRemoveUJ, 1)
      }
      const indexToRemoveRQ = filaPronto.indexOf(processoAtual)
      if (indexToRemoveRQ > -1) {
        filaPronto.splice(indexToRemoveRQ, 1)
      }

      processos.push({
        ...processoAtual,
        ft: Number(tempoAtual),
        tempoTurnaround: Number(tempoAtual) - Number(processoAtual.at),
        tempoEspera:
          Number(tempoAtual) - Number(processoAtual.at) - Number(processoAtual.tempoExecucao)
      })
    }
  }

  // Organizando processo pelo nome
  processos.sort((obj1, obj2) => {
    if (obj1.at > obj2.at) return 1
    if (obj1.at < obj2.at) return -1
    if (obj1.nome > obj2.nome) return 1
    if (obj1.nome < obj2.nome) return -1
    return 0
  })

  return { processos }
}
