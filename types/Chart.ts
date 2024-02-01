export type SeriesItem = {
  name?: string
  type: string
  data: number[]
  stack?: string
  color?: string
  smooth?: boolean
  totalDataValue?: number
  percentage?: string
  areaStyle?: {
    color: string
  }
  symbol?: string
  symbolSize?: number
}

type FormatterOption = {
  dataIndex: number
}

export type TooltipFormatterOptions = FormatterOption[] | FormatterOption
