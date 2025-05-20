export const serializeBigInts = <T>(obj: T): T | T[] => {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts)
  } else if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {}
    for (const key in obj) {
      const value = obj[key]
      result[key] =
        typeof value === "bigint" ? value.toString() : serializeBigInts(value)
    }
    return result as T
  } else {
    return obj
  }
}
