export const debouncedUpdate = (
  handler: (quantity: number) => Promise<void> | void,
  setLoading: (val: boolean) => void,
  debounceMs = 300
) => {
  let timeout: NodeJS.Timeout | null = null
  let accumulated = 0
  let inProgress = false

  return () => {
    accumulated += 1

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(async () => {
      if (inProgress || accumulated === 0) return

      setLoading(true)
      inProgress = true

      const toApply = accumulated
      accumulated = 0

      try {
        await handler(toApply)
      } finally {
        setLoading(false)
        inProgress = false
      }
    }, debounceMs)
  }
}
