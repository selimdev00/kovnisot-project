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

  const updateStageTitle = (id: number, title: string) => {
    const stage = stages.value.find((stage) => stage.id === id)

    if (stage) {
      stage.title = title

      useNuxtApp().$toast.info('Stage updated')
    }
  }

  return {
    stages,
    addStage,
    removeStage,
    updateStageTitle,
  }
})
