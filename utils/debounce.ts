let timeoutId: NodeJS.Timeout

export default function debounce(fn: () => void, delay: number) {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(() => {
    fn()
  }, delay)
}