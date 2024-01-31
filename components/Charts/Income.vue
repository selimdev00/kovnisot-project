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
        class="py-2 px-4 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2"
      >
        <span
          class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600 bg-blue-600"
        />

        Продукт 1
      </button>

      <button
        class="py-2 px-4 text-gray-500 rounded-lg bg-gray-800 flex items-center justify-center font-medium gap-2"
      >
        <span
          class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600 bg-cyan-400"
        />

        Продукт 2
      </button>
    </div>

    <div :id="id" class="h-[400px]" />
  </div>
</template>

<script setup lang="ts">
import { init } from 'echarts'
import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'

const props = defineProps<{ id: string }>()

onMounted(() => {
  const chart = init(document.getElementById(props.id), 'custom')

  const firstProductData = {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 1',
    type: 'bar',
    stack: 'x',
    color: '#13D6FF',
  }
  const secondProductData = {
    data: generateMockDataForChart({ length: 2, range: 2000 }),
    name: 'Продукт 2',
    type: 'bar',
    stack: 'x',
    color: '#0077F7',
  }

  chart.setOption({
    xAxis: {},
    data: ['Факт', 'План'],
    yAxis: {
      data: ['Факт', 'План'],
    },
    tooltip: {
      show: true,
      formatter: (options: { dataIndex: number }) =>
        chartTooltipFormatter({
          dataIndex: options.dataIndex,
          dataArray: [firstProductData, secondProductData],
        }),
    },
    series: [firstProductData, secondProductData],
  })

  window.addEventListener('resize', () => {
    chart.resize()
  })
})
</script>
