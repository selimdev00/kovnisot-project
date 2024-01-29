import type {
  Stage,
  StageId,
  Task,
  TaskId,
  UpdateTaskDTO,
} from '~/types/Canban'

export const useCanbanStore = defineStore('canban', () => {
  const stages = ref<Stage[]>([])
  const tasks = computed<Task[]>(() => {
    return stages.value.map((stage) => stage.tasks).flat()
  })

  const addStage = (title: string) => {
    stages.value.push({
      id: stages.value.length + 1,
      title,
      tasks: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  const removeStage = (id: StageId) => {
    stages.value = stages.value.filter((stage) => stage.id !== id)

    useNuxtApp().$toast.info('Stage removed')
  }

  const updateStageTitle = (id: StageId, title: string) => {
    const stage = stages.value.find((stage) => stage.id === id)

    if (stage) {
      stage.title = title

      stage.updated_at = new Date().toISOString()

      useNuxtApp().$toast.info('Stage updated')
    }
  }

  const addTask = (stageId: StageId, task: UpdateTaskDTO) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    task.created_at = new Date().toISOString()
    task.updated_at = new Date().toISOString()
    task.stage_id = stageId

    if (stage) {
      stage.updated_at = new Date().toISOString()

      stage.tasks.push({
        ...task,
        id: stage.title + stage.tasks.length + 1,
      } as Task)
    }
  }

  const removeTask = (stageId: StageId, taskId: TaskId) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    if (stage) {
      stage.tasks = stage.tasks.filter((task) => task.id !== taskId)

      useNuxtApp().$toast.info('Task removed')

      stage.updated_at = new Date().toISOString()
    }
  }

  const findTask = (taskId: TaskId) => {
    return tasks.value.find((task) => task.id === taskId)
  }

  const findStage = (stageId: StageId) => {
    return stages.value.find((stage) => stage.id === stageId)
  }

  const removeTaskFromStage = (stageId: StageId, taskId: TaskId) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    if (stage) {
      stage.tasks = stage.tasks.filter((task) => task.id !== taskId)
    }
  }

  const updateTask = (payload: UpdateTaskDTO) => {
    const task = findTask(payload.id)

    if (task) {
      task.title = payload.title
      task.description = payload.description

      if (task.stage_id !== payload.stage_id) {
        const sourceStage = findStage(task.stage_id)
        const destinationStage = findStage(payload.stage_id)

        if (sourceStage && destinationStage) {
          removeTaskFromStage(sourceStage.id, task.id)
          destinationStage.tasks.push(task)

          task.stage_id = payload.stage_id
        }
      }

      useNuxtApp().$toast.info('Task updated')
    } else {
      useNuxtApp().$toast.error('Task not found')
    }
  }

  const updateStageTasks = (stageId: StageId, tasks: Task[]) => {
    const stage = findStage(stageId)

    if (stage) {
      stage.tasks = tasks

      stage.updated_at = new Date().toISOString()

      useNuxtApp().$toast.info('Stage tasks updated')
    }
  }

  return {
    stages,
    tasks,
    addStage,
    removeStage,
    updateStageTitle,
    addTask,
    removeTask,
    findTask,
    findStage,
    updateTask,
    updateStageTasks,
  }
})
