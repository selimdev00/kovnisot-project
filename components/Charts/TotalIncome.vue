<template>
  <div class="flex flex-col text-white flex-1">
    <h2 class="text-lg uppercase">ОБЩАЯ ВЫРУЧКА</h2>

    <div class="flex flex-wrap items-center w-full">
      <div
        v-for="section in categorySections"
        :key="section.id"
        class="group p-4 flex-1 flex flex-col gap-1 min-w-[200px] relative justify-center"
      >
        <h3
          class="font-medium text-gray-500 uppercase flex gap-2 items-center text-xl"
        >
          <span
            v-if="section.color"
            class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600"
            :style="`background-color: ${section.color}`"
          />

          {{ section.title }}
        </h3>

        <p class="text-2xl mt-2 font-semibold">
          {{ section.total }}
        </p>

        <div
          class="bg-neutral-800 w-[1px] h-[68px] absolute left-0 group-first:hidden"
        />
      </div>
    </div>

    <div :id="id" class="h-[400px]" />
  </div>
</template>

<script setup lang="ts">
import { init } from 'echarts'
import generateMockDataForChart from '~/helpers/generateMockDataForChart'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'

const props = defineProps<{ id: string }>()

const categorySections: CategorySection[] = [
  {
    id: 0,
    title: 'Общее оплачено',
    total: '1 123 500 ₽ ',
  },
  {
    id: 1,
    title: 'Деньги за мясо',
    total: '145 200 ₽ ',
    color: '#9747FF',
  },
  {
    id: 2,
    title: 'Расходы на ЗП',
    total: '1 223 500 ₽ ',
    color: '#0077F7',
  },
  {
    id: 3,
    title: 'Прочее',
    total: '23 500 ₽ ',
    color: '#13D6FF',
  },
]

onMounted(() => {
  const chart = init(document.getElementById(props.id), 'custom')

  const series = [
    {
      name: 'Прочее',
      type: 'bar',
      data: generateMockDataForChart({ length: 12, range: 100 }),
      stack: 'x',
      color: '#13D6FF',
    },
    {
      name: 'ЗП',
      type: 'bar',
      data: generateMockDataForChart({ length: 12, range: 100 }),
      stack: 'x',
      color: '#0077F7',
    },
    {
      name: 'Мясо',
      type: 'bar',
      data: generateMockDataForChart({ length: 12, range: 100 }),
      stack: 'x',
      color: '#9747FF',
    },
    {
      data: generateMockDataForChart({ length: 12, range: 100 }),
      type: 'line',
      smooth: true,
      color: '#C6EC92',
    },
  ]

  chart.setOption({
    xAxis: {
      data: [
        'Янв',
        'Фев',
        'Март',
        'Апр',
        'Май',
        'Июнь',
        'Июль',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
    },
    yAxis: {},
    tooltip: {
      formatter: (options: { dataIndex: number }) =>
        chartTooltipFormatter({
          dataIndex: options.dataIndex,
          dataArray: series.filter((e) => e.name),
        }),
    },
    series,
  })

  window.addEventListener('resize', () => {
    chart.resize()
  })
})

type CategorySection = {
  id: number
  title: string
  total: string
  color?: string
}
</script>
