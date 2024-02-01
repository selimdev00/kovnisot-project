<template>
  <div class="flex flex-col text-white flex-1 gap-6">
    <h2 class="text-lg uppercase">Прибыль</h2>

    <div class="flex gap-2">
      <button
        class="group py-2 px-4 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2 transition"
        :class="{ '!bg-blue-600 text-white': filter === 'all' }"
        @click="filter = 'all'"
      >
        Все
      </button>

      <button
        v-for="item in series"
        :key="item.name"
        class="group py-2 px-4 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2 transition"
        :class="{ '!bg-blue-600 text-white': filter === item.name }"
        @click="filter = item.name as string"
      >
        <span
          class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600"
          :style="`background-color: ${filter === item.name ? 'white' : item.color}`"
        />

        {{ item.name }}
      </button>
    </div>

    <transition-group
      tag="div"
      name="list-fade-x"
      mode="out-in"
      class="grid grid-cols-3 gap-4"
    >
      <div
        v-for="item in filteredSeries"
        :key="item.name"
        class="flex flex-col gap-3 border-r border-gray-800 last:border-0 pl-4 first:pl-0"
      >
        <span class="text-xl text-gray-400">{{ item.name }}</span>

        <div class="flex flex-col">
          <span class="text-xl text-white font-semibold">
            {{ item.totalDataValue }}
          </span>

          <span class="text-gray-500 text-lg">/ 2.000</span>

          <div class="flex items-center text-lime-200 gap-3">
            <div class="h-[2px] w-[160px] bg-gray-700">
              <div
                class="h-full bg-lime-200"
                :style="`width: ${item.percentage}%`"
              />
            </div>

            <span>{{ item.percentage }}%</span>
          </div>
        </div>
      </div>
    </transition-group>

    <div :id="id" class="h-[380px]" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import { useChart } from '~/composables/useChart'

import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import returnDataTotalValue from '~/helpers/returnDataTotalValue'
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

for (const item of series) {
  item.totalDataValue = returnDataTotalValue(item.data)
  item.percentage = ((item.totalDataValue / 2000) * 100).toFixed(0)
}

const filter = ref<string>('all')
const filteredSeries = computed<SeriesItem[]>(() => {
  if (filter.value === 'all') {
    return series
  }
  return series.filter((e) => e.name === filter.value)
})

const { loadChart, reloadChart } = useChart(props.id, {
  yAxis: {
    data: ['Факт', 'План'],

    splitLine: {
      show: true,
      lineStyle: {
        color: ['#292829'],
      },
    },
  },
  xAxis: {
    splitLine: {
      show: false,
    },
  },
} as EChartsOption)

onMounted(() => {
  loadChart(filteredSeries.value)
})

watch(filteredSeries, () => {
  reloadChart(filteredSeries.value)
})
</script>
