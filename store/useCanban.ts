import type {
  CreateTaskDTO,
  Stage,
  StageId,
  Task,
  TaskId,
  UpdateTaskDTO,
} from '~/types/Canban'

import { useStorage } from '@vueuse/core'
import generateUniqueId from '~/helpers/generateUniqueId'
import currentDateAsISOString from '~/helpers/currentDateAsISOString'

export const useCanbanStore = defineStore('canban', () => {
  const stages = useStorage<Stage[]>('stages', [], localStorage, {
    mergeDefaults: true,
  })
  const tasks = computed<Task[]>(() => {
    return stages.value.map((stage) => stage.tasks).flat()
  })

  const addStage = (title: string) => {
    stages.value.push({
      id: generateUniqueId('stage-'),
      title,
      tasks: [],
      created_at: currentDateAsISOString(),
      updated_at: currentDateAsISOString(),
    })
  }

  const removeStage = (id: StageId) => {
    stages.value = stages.value.filter((stage) => stage.id !== id)

    useNuxtApp().$toast.info('Stage removed')
  }

  const updateStageTitle = (id: StageId, title: string) => {
    const stage = stages.value.find((stage) => stage.id === id)

    if (stage) {
      if (stage.title === title) return

      stage.title = title

      stage.updated_at = currentDateAsISOString()

      useNuxtApp().$toast.info('Stage updated')
    }
  }

  const addTask = (stageId: StageId, task: CreateTaskDTO) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    if (stage) {
      stage.tasks.push({
        ...task,
        id: generateUniqueId('task-'),
        created_at: currentDateAsISOString(),
        updated_at: currentDateAsISOString(),
        stage_id: stageId,
      } as Task)
    }
  }

  const removeTask = (stageId: StageId, taskId: TaskId) => {
    const stage = stages.value.find((stage) => stage.id === stageId)

    if (stage) {
      stage.tasks = stage.tasks.filter((task) => task.id !== taskId)

      useNuxtApp().$toast.info('Task removed')

      stage.updated_at = currentDateAsISOString()
    }
  }

  const findTask = (taskId: TaskId) => {
    return tasks.value.find((task) => task.id === taskId)
  }

  const findStage = (stageId: StageId): Stage | null => {
    return stages.value.find((stage) => stage.id === stageId) || null
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
      if (task.title !== payload.title) task.title = payload.title
      if (task.description !== payload.description)
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

      task.updated_at = currentDateAsISOString()

      useNuxtApp().$toast.info('Task updated')
    } else {
      useNuxtApp().$toast.error('Task not found')
    }
  }

  const updateTaskOnMove = (payload: UpdateTaskDTO) => {
    const task = findTask(payload.id)

    if (task) {
      task.stage_id = payload.stage_id
    }
  }

  const updateStageTasks = (stageId: StageId, tasks: Task[]) => {
    const stage = findStage(stageId)

    if (stage) {
      stage.tasks = tasks

      stage.updated_at = currentDateAsISOString()
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
    updateTaskOnMove,
  }
})
