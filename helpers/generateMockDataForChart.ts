export default function generateMockDataForChart(options: {
  length: number
  range: number
}): number[] {
  const mockData: number[] = []

  for (let i = 0; i < options.length; i++) {
    const randomNumber = Math.floor(Math.random() * (options.range / 2)) + 1
    mockData.push(randomNumber)
  }

  return mockData
}
