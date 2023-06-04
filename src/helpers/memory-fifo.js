export default function FIFO(processos, qtdBlocos) {
  const historico = []
  const blocosMemoria = [...Array(qtdBlocos)].map((i, index) => ({
    bloco: index + 1,
    processo: null,
    pageFault: true
  }))

  let achou = false
  let contador = 0

  while (processos.length > 0) {
    for (let index = 0; index < processos.length; index++) {
      achou = false
      for (let i = 0; i < blocosMemoria.length; i++) {
        if (blocosMemoria[i].processo != null) {
          if (blocosMemoria[i].processo == processos[index]) {
            blocosMemoria[i].pageFault = false
            processos.splice(index, 1)
            achou = true
            break
          }
        }
      }
      if (achou == true) {
        for (let i = 0; i < blocosMemoria.length; i++) {
          blocosMemoria[i].pageFault = false
        }
        break
      }
      const processo = processos[index]
      if (contador == blocosMemoria.length) contador = 0
      if (blocosMemoria[contador].processo == null) {
        blocosMemoria[contador].processo = processo
        blocosMemoria[contador].pageFault = true
        processos.splice(index, 1)
        contador++
        break
      } else if (blocosMemoria[contador].processo != null) {
        blocosMemoria[contador].processo = processo
        for (let i = 0; i < blocosMemoria.length; i++) {
          blocosMemoria[i].pageFault = false
        }
        blocosMemoria[contador].pageFault = true
        processos.splice(index, 1)
        contador++
        break
      }
    }
    historico.push(JSON.parse(JSON.stringify(blocosMemoria)))
  }

  return historico
}
