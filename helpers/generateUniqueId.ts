export default function generateUniqueId(prefix: string = ''): string {
  const currentDateString = new Date().toISOString().replace(/[^0-9]/g, '')
  return prefix + currentDateString
}
