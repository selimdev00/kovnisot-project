import { init } from 'echarts'
import type { EChartsType } from 'echarts'

import type { EChartsOption } from 'echarts/types/dist/shared'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'
import type { SeriesItem, TooltipFormatterOptions } from '~/types/Chart'

export function useChart(id: string, chartOptions: EChartsOption) {
  let chart: EChartsType | null = null

  const windowResizer = () => {
    chart?.resize()
  }

  const loadChart = (series: SeriesItem[]): void => {
    chart = init(document.getElementById(id), 'custom')

    chart.setOption({
      ...chartOptions,
      series,
      grid: {
        containLabel: true,
        x: '3%',
        y: '5%',
        x2: '3%',
        y2: '4%',
        ...chartOptions.grid,
      },
      tooltip: {
        formatter: (options: TooltipFormatterOptions) => {
          const dataIndex = Array.isArray(options)
            ? options[0].dataIndex
            : options.dataIndex

          return chartTooltipFormatter({
            dataIndex,
            series: series.filter((e) => e.name),
          })
        },

        ...chartOptions.tooltip,
      },
    })

    window.addEventListener('resize', windowResizer)
  }

  const reloadChart = (series: SeriesItem[]): void => {
    chart?.clear()

    loadChart(series)
  }

  onUnmounted(() => {
    window.removeEventListener('resize', windowResizer)
  })

  return {
    loadChart,
    reloadChart,
  }
}
