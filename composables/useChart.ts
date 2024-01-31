import { init } from 'echarts'

import type { EChartsOption } from 'echarts/types/dist/shared'
import chartTooltipFormatter from '~/helpers/chartTooltipFormatter'
import type { SeriesItem } from '~/types/Chart'

export function useChart(id: string, chartOptions: EChartsOption) {
  onMounted(() => {
    const chart = init(document.getElementById(id), 'custom')

    chart.setOption({
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

    window.addEventListener('resize', () => {
      chart.resize()
    })
  })
}
