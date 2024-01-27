import type { Stage, Task } from '~/types/Canban'

export const useCanbanStore = defineStore('canban', () => {
  const stages = ref<Stage[]>([])

  const addStage = (title: string) => {
    stages.value.push({
      id: stages.value.length + 1,
      title,
      tasks: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  const removeStage = (id: number) => {
    stages.value = stages.value.filter((stage) => stage.id !== id)

    useNuxtApp().$toast.info('Stage removed')
  }

  const updateStageTitle = (id: number, title: string) => {
    const stage = stages.value.find((stage) => stage.id === id)

    if (stage) {
      stage.title = title

      stage.updated_at = new Date().toISOString()

      useNuxtApp().$toast.info('Stage updated')
    }
  }

  const addTask = (stageId: number, task: Omit<Task, 'id'>) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    task.created_at = new Date().toISOString()
    task.updated_at = new Date().toISOString()
    task.stage_id = stageId

    if (stage) {
      stage.updated_at = new Date().toISOString()

      stage.tasks.push({
        ...task,
        id: stage.title + stage.tasks.length + 1,
      })
    }
  }

  const removeTask = (stageId: number, taskId: number) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    if (stage) {
      stage.tasks = stage.tasks.filter((task) => task.id !== taskId)

      useNuxtApp().$toast.info('Task removed')

      stage.updated_at = new Date().toISOString()
    }
  }

  const findTask = (taskId: string) => {
    return stages.value
      .map((stage) => stage.tasks)
      .flat()
      .find((task) => task.id === taskId)
  }

  const findStage = (stageId: number) => {
    return stages.value.find((stage) => stage.id === stageId)
  }

  return {
    stages,
    addStage,
    removeStage,
    updateStageTitle,
    addTask,
    removeTask,
    findTask,
    findStage,
  }
})
