export type Task = {
  id: number
  title: string
}

export const useCanbanStore = defineStore('canban', () => {
  const tasks = ref<Task[]>([])

  const addTask = (task: Task) => {
    tasks.value.push(task)
  }

  return {
    tasks,
    addTask,
  }
})
