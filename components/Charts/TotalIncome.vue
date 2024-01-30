<template>
  <div class="flex flex-col text-white">
    <h2 class="text-xl">
      ОБЩАЯ ВЫРУЧКА
    </h2>

    <div class="flex items-center w-full">
      <div
        v-for="section in categorySections"
        :key="section.id"
        class="p-4 border-r border-neutral-600 last:border-0 flex-1 flex flex-col gap-1"
      >
        <h3 class="font-medium text-gray-500 uppercase flex gap-2 items-center">
          <span
            v-if="section.titleDotColor"
            :class="`block h-1 w-1 rounded-full`"
            :style="`background-color: ${section.titleDotColor}`"
          />

          {{ section.title }}
        </h3>

        <p class="text-2xl">
          {{ section.total }}
        </p>
      </div>
    </div>

    <div
      :id="id"
      class="h-[400px]"
    />
  </div>
</template>

<script setup lang="ts">
import { init, registerTheme } from 'echarts'
import theme from '~/assets/echarts-theme.json'

const props = defineProps<{id: string}>()

function generateMockChartData() {
  const mockData = [];

  for (let i = 0; i < 12; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    mockData.push(randomNumber);
  }

  return mockData;
}

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
    titleDotColor: '#9747FF',
  },
  {
    id: 2,
    title: 'Расходы на ЗП',
    total: '1 223 500 ₽ ',
    titleDotColor: '#0077F7',
  },
  {
    id: 3,
    title: 'Прочее',
    total: '23 500 ₽ ',
    titleDotColor: '#13D6FF',
  },
]

onMounted(() => {
  registerTheme('custom', theme)

  const chart = init(document.getElementById(props.id), 'custom')


  chart.setOption({
    tooltip: {},
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
    series: [
      {
        name: 'Прочее',
        type: 'bar',
        data: generateMockChartData(),
        stack: 'x',
        color: '#13D6FF',
      },
      {
        name: 'ЗП',
        type: 'bar',
        data: generateMockChartData(),
        stack: 'x',
        color: '#0077F7',
      },
      {
        name: 'Мясо',
        type: 'bar',
        data: generateMockChartData(),
        stack: 'x',
        color: '#9747FF',
      },
      {
        data: generateMockChartData(),
        type: 'line',
        smooth: true,
        color: '#C6EC92'
      }
    ],
  })
})

type CategorySection = {
  id: number
  title: string
  total: string
  titleDotColor?: string
}
</script>
