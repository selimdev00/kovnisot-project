export default function chartTooltipFormatter(options: {
  dataIndex: number
  dataArray: any[]
}) {
  let items = ``

  for (let i = 0; i < options.dataArray.length; i++) {
    const data = options.dataArray[i]
    const color = data.color
    const name = data.name
    const dataValue = data.data[options.dataIndex]

    items += `<div class="flex flex-col gap-1">
                <span class="text-[#818281]">${name}</span>

                <div class="flex items-center gap-2">
                   <div class="w-[10px] h-[10px] rounded-full" style="background-color: ${color}"></div>

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
