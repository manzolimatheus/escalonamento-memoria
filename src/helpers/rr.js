export function rr(arrivalTime, burstTime, timeQuantum) {
  const processesInfo = arrivalTime
    .map((item, index) => {
      return {
        job: (index + 10).toString(36).toUpperCase(),
        at: item,
        bt: Number(burstTime[index])
      }
    })
    .sort((obj1, obj2) => {
      if (obj1.at > obj2.at) return 1
      if (obj1.at < obj2.at) return -1
      return 0
    })

  const solvedProcessesInfo = []
  const ganttChartInfo = []

  const readyQueue = []
  let currentTime = processesInfo[0].at
  const unfinishedJobs = [...processesInfo]

  const remainingTime = processesInfo.reduce((acc, process) => {
    acc[process.job] = process.bt
    return acc
  }, {})

  readyQueue.push(unfinishedJobs[0])
  while (
    Object.values(remainingTime).reduce((acc, cur) => {
      return acc + cur
    }, 0) &&
    unfinishedJobs.length > 0
  ) {
    if (readyQueue.length === 0 && unfinishedJobs.length > 0) {
      // Previously idle
      readyQueue.push(unfinishedJobs[0])
      currentTime = readyQueue[0].at
    }

    const processToExecute = readyQueue[0]

    if (remainingTime[processToExecute.job] <= timeQuantum) {
      // Burst time less than or equal to time quantum, execute until finished
      const remainingT = remainingTime[processToExecute.job]
      remainingTime[processToExecute.job] -= Number(remainingT)
      const prevCurrentTime = Number(currentTime)
      currentTime += Number(remainingT)

      ganttChartInfo.push({
        job: processToExecute.job,
        start: prevCurrentTime,
        stop: currentTime
      })
    } else {
      remainingTime[processToExecute.job] -= Number(timeQuantum)
      const prevCurrentTime = Number(currentTime)
      currentTime += Number(timeQuantum)

      ganttChartInfo.push({
        job: processToExecute.job,
        start: prevCurrentTime,
        stop: currentTime
      })
    }
    const processToArriveInThisCycle = processesInfo.filter((p) => {
      return (
        p.at <= currentTime &&
        p !== processToExecute &&
        !readyQueue.includes(p) &&
        unfinishedJobs.includes(p)
      )
    })

    // Push new processes to readyQueue
    readyQueue.push(...processToArriveInThisCycle)

    // Requeueing (move head/first item to tail/last)
    readyQueue.push(readyQueue.shift())

    // When the process finished executing
    if (remainingTime[processToExecute.job] === 0) {
      const indexToRemoveUJ = unfinishedJobs.indexOf(processToExecute)
      if (indexToRemoveUJ > -1) {
        unfinishedJobs.splice(indexToRemoveUJ, 1)
      }
      const indexToRemoveRQ = readyQueue.indexOf(processToExecute)
      if (indexToRemoveRQ > -1) {
        readyQueue.splice(indexToRemoveRQ, 1)
      }

      solvedProcessesInfo.push({
        ...processToExecute,
        ft: Number(currentTime),
        tat: Number(currentTime) - Number(processToExecute.at),
        wat: Number(currentTime) - Number(processToExecute.at) - Number(processToExecute.bt)
      })
    }
  }

  // Sort the processes arrival time and then by job name
  solvedProcessesInfo.sort((obj1, obj2) => {
    if (obj1.at > obj2.at) return 1
    if (obj1.at < obj2.at) return -1
    if (obj1.job > obj2.job) return 1
    if (obj1.job < obj2.job) return -1
    return 0
  })

  console.log({ solvedProcessesInfo })

  return { solvedProcessesInfo, ganttChartInfo }
}
