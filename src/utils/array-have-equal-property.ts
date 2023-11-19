export function arraysHaveEqualProperty<T>(
  array1: T[],
  array2: T[],
  propertyName: keyof T,
): boolean {
  if (array1.length !== array2.length || array1.length === 0) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i][propertyName] !== array2[i][propertyName]) {
      return false
    }
  }

  return true
}
