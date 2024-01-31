<template>
  <div v-if="isReady" class="bg-neutral-900 min-h-screen p-4">
    <div class="flex flex-wrap">
      <ChartsTotalIncome id="chart-1" />

      <ChartsIncome id="chart-2" />
    </div>

    <ChartsTotalIncome id="chart-3" />
  </div>
</template>

<script setup lang="ts">
import { registerTheme } from 'echarts'
import theme from '~/assets/echarts-theme.json'

const isReady = ref<boolean>(false)

onMounted(() => {
  registerTheme('custom', theme)

  isReady.value = true
})
</script>
