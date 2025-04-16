export const serializeBigInts = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts)
  } else if (typeof obj === "object" && obj !== null) {
    const result: Record<string, any> = {}
    for (const key in obj) {
      const value = obj[key]
      result[key] =
        typeof value === "bigint" ? value.toString() : serializeBigInts(value)
    }
    return result
  } else {
    return obj
  }
}
