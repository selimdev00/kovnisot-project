<template>
  <div
    class="flex flex-col items-center bg-neutral-900 min-h-screen text-white gap-12"
  >
    <div class="relative flex w-full justify-center items-center p-4">
      <button
        class="cursor-pointer group absolute left-4 text-4xl w-12 h-12 flex items-center justify-center outline-none"
      >
        <IconArrowBack class="z-10" />

        <div
          class="h-full w-full bg-neutral-700 rounded-full absolute top-0 left-0 scale-0 transition group-hover:scale-100 group-focus:scale-100 z-0"
        />
      </button>

      <h1 class="text-4xl font-bold">ECHART</h1>
    </div>

    <div v-if="isReady" class="p-4 flex flex-col gap-4 w-full">
      <div class="flex flex-wrap gap-4">
        <ChartsTotalIncome id="chart-1" />

        <ChartsIncome id="chart-2" />
      </div>

      <PlanFact id="chart-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerTheme } from 'echarts'
import theme from '~/assets/echarts-theme.json'
import PlanFact from '~/components/Charts/PlanFact.vue'

const isReady = ref<boolean>(false)

onMounted(() => {
  registerTheme('custom', theme)

  isReady.value = true
})
</script>
