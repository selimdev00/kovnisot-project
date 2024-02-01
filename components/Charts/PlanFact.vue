<template>
  <div class="flex flex-col gap-4 text-white flex-1 gap-6p p-4">
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

    <div :id="id" class="h-[400px] w-full" />
  </div>
</template>

<script setup lang="ts">
import type { SeriesItem } from '~/types/Chart'
import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import type { EChartsOption } from 'echarts/types/dist/shared'

const filter = ref<string>('all')

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
  {
    data: generateMockDataForChart({ length: 31, range: 600 }),
    name: 'План',
    type: 'line',
    color: '#0077F7',
    areaStyle: {
      color: 'rgba(24, 160, 251, 0.3)',
    },
    symbol: 'circle',
    symbolSize: 10,
  },
  {
    data: generateMockDataForChart({ length: 31, range: 600 }),
    name: 'Факт',
    type: 'line',
    color: '#13D6FF',
    areaStyle: {
      color: 'rgba(189, 255, 255, 0.7)',
    },
    symbol: 'circle',
    symbolSize: 10,
  },
]

const { loadChart, reloadChart } = useChart(props.id, {
  xAxis: {
    data: Array.from({ length: 31 }, (_, index) => {
      const dayNumber = index + 1
      return dayNumber.toString().padStart(2, '0')
    }),
  },
  yAxis: {},
  grid: {
    x: '1%',
    x2: '1%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        backgroundColor: '#6a7985',
      },
      lineStyle: {
        color: '#0077F7',
      },
    },
  },
} as EChartsOption)

const filteredSeries = computed<SeriesItem[]>(() => {
  if (filter.value === 'all') {
    return series
  }

  return series.filter((e) => e.name === filter.value)
})

onMounted(() => {
  loadChart(filteredSeries.value)
})

watch(filter, () => {
  reloadChart(filteredSeries.value)
})
</script>
