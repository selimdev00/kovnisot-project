import type { SeriesItem } from '~/types/Chart'

export default function chartTooltipFormatter(options: {
  dataIndex: number
  series: SeriesItem[]
}) {
  let items = ``

  for (let i = 0; i < options.series.length; i++) {
    const data = options.series[i]
    const color = data.color
    const name = data.name
    const dataValue = data.data[options.dataIndex]

    items += `<div class="flex flex-col gap-1">
                <span class="text-[#818281]">${name}</span>

                <div class="flex items-center gap-2">
                   <div class="rounded-full" style="background-color: ${color}; width: 10px; height: 10px;"></div>

                  <span class="font-semibold text-white">${dataValue}</span>
                </div>
              </div>`
  }

  const template = `
        <div class="flex gap-4">
            ${items}
        </div>
    `

  return template
}
