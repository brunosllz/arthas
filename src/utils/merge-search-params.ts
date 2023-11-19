/**
 * Receives a array of objects with the following format:
 * { tag: string; value: string }
 * and returns a string in the following format:
 * tag1=value1,value2&tag2=value3,value4
 *
 * @param array {{ tag: string; value: string }[]}
 * @returns string
 */

export function mergeSearchParams(
  array: { tag: string; value: string }[],
): string {
  const tagValues: { [key: string]: string[] } = {}

  // Itera sobre o array e agrupa os valores por tag
  array.forEach((item) => {
    if (!tagValues[item.tag]) {
      tagValues[item.tag] = []
    }
    tagValues[item.tag].push(item.value)
  })

  // Converte o objeto em uma string no formato desejado
  const result = Object.entries(tagValues)
    .map(([tag, values]) => `${tag}=${values.join(',')}`)
    .join('&')

  return result
}
