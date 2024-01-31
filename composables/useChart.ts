import { init } from 'echarts'
import type { EChartsType } from 'echarts'

import type { EChartsOption } from 'echarts/types/dist/shared'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'
import type { SeriesItem } from '~/types/Chart'

export function useChart(id: string, chartOptions: EChartsOption) {
  const chart = ref<EChartsType | null>(null)

  function windowResizer() {
    if (!chart.value) return
    chart.value.resize()
  }

  function initChart() {
    chart.value = init(document.getElementById(id), 'custom')

    chart.value.setOption({
      ...chartOptions,
      tooltip: {
        show: true,
        formatter: (options: { dataIndex: number }) =>
          chartTooltipFormatter({
            dataIndex: options.dataIndex,
            series: chartOptions.series as SeriesItem[],
          }),
      },
    })

    window.addEventListener('resize', windowResizer)
  }

  onMounted(() => {
    initChart()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', windowResizer)
  })

  watch(
    () => chartOptions.series,
    () => {
      console.log('something changed')
      window.removeEventListener('resize', windowResizer)
      initChart()
    },
  )
}
