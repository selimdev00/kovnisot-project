import type { Stage } from '~/types/Canban'

export const useCanbanStore = defineStore('canban', () => {
  const stages = ref<Stage[]>([])

  const addStage = (title: string) => {
    stages.value.push({
      id: stages.value.length + 1,
      title,
      tasks: [],
    })
  }

  return {
    stages,
    addStage,
  }
})
