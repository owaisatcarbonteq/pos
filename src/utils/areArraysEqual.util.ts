export function areArraysEqual(arr1: unknown[], arr2: unknown[]) {
  if (
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1.length !== arr2.length
  ) {
    return false
  }

  if (arr1.every((item) => item === null || typeof item !== "object")) {
    return [...arr1].sort().toString() === [...arr2].sort().toString()
  }

  const counter = new Map()

  for (const item of arr1) {
    const key =
      typeof item === "object" && item !== null ? JSON.stringify(item) : item
    counter.set(key, (counter.get(key) || 0) + 1)
  }

  for (const item of arr2) {
    const key =
      typeof item === "object" && item !== null ? JSON.stringify(item) : item
    const count = counter.get(key)

    if (count === undefined || count === 0) return false
    counter.set(key, count - 1)
  }

  return true
}
