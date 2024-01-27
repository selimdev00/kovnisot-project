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

  const removeStage = (id: number) => {
    stages.value = stages.value.filter((stage) => stage.id !== id)

    useNuxtApp().$toast.info('Stage removed')
  }

  return {
    stages,
    addStage,
    removeStage,
  }
})
