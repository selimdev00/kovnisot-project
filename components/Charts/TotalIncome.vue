<template>
  <div class="flex flex-col text-white flex-1">
    <h2 class="text-lg uppercase">ОБЩАЯ ВЫРУЧКА</h2>

    <div class="flex flex-wrap items-center w-full">
      <div
        class="group p-4 flex-1 flex flex-col gap-1 min-w-[200px] relative justify-center"
      >
        <h3
          class="font-medium text-gray-500 uppercase flex gap-2 items-center text-xl"
        >
          Общее оплачено
        </h3>

        <p class="text-2xl mt-2 font-semibold">
          {{ total }}
        </p>

        <div
          class="bg-neutral-800 w-[1px] h-[68px] absolute left-0 group-first:hidden"
        />
      </div>

      <div
        v-for="item in sections"
        :key="item.name"
        class="group p-4 flex-1 flex flex-col gap-1 min-w-[200px] relative justify-center"
      >
        <h3
          class="font-medium text-gray-500 uppercase flex gap-2 items-center text-xl"
        >
          <span
            v-if="item.color"
            class="block h-1 w-1 rounded-full border-[1px] border-opacity-90 border-gray-600"
            :style="`background-color: ${item.color}`"
          />

          {{ item.name }}
        </h3>

        <p class="text-2xl mt-2 font-semibold">
          {{ (item.data.reduce((a, b) => a + b, 0) * 10000).toLocaleString() }}
          ₽
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
import type { SeriesItem } from '~/types/Chart'
import type { EChartsOption } from 'echarts/types/dist/shared'

import generateMockDataForChart from '~/helpers/generateMockDataForChart'

const props = defineProps<{ id: string }>()

const series: SeriesItem[] = [
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

const sections: SeriesItem[] = series.filter((e) => e.name)

const total = computed<string>(() => {
  const total = sections.reduce(
    (a, b) => a + b.data.reduce((a, b) => a + b, 0),
    0,
  )
  return (total * 10000).toLocaleString() + ' ₽'
})

useChart(props.id, {
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
  series: sections,
} as EChartsOption)
</script>
