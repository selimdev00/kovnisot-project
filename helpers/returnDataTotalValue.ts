export default function returnDataTotalValue(data: number[]) {
  return data.reduce((a, b) => a + b, 0)
}
