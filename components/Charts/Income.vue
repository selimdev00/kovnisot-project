<template>
  <div class="flex flex-col text-white flex-1 gap-4">
    <h2 class="text-lg uppercase">Прибыль</h2>

    <div class="flex gap-2">
      <button
        class="py-2 px-4 text-white rounded-lg bg-blue-600 flex items-center justify-center font-medium"
      >
        Все
      </button>

      <button
        v-for="item in series"
        :key="item.name"
        class="py-2 px-4 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2"
      >
        <span
          class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600"
          :style="`background-color: ${item.color}`"
        />

        {{ item.name }}
      </button>
    </div>

    <div :id="id" class="h-[400px]" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import { useChart } from '~/composables/useChart'

import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import type { EChartsOption } from 'echarts/types/dist/shared'

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
  {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 1',
    type: 'bar',
    stack: 'x',
    color: '#0077F7',
  },
  {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 2',
    type: 'bar',
    stack: 'x',
    color: '#13D6FF',
  },
]

useChart(props.id, {
  series,
  yAxis: {
    data: ['Факт', 'План'],
  },
  xAxis: {},
} as EChartsOption)
</script>
