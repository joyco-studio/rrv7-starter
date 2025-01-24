export const noop = () => {}

export const getYear = (d: string): number => {
  return new Date(d).getFullYear()
}

export const exponentialMap: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '(': '⁽',
  ')': '⁾',
  '*': '⋅',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  n: 'ⁿ',
}

export const mapRange = (value: number, min: number, max: number) => {
  const normalized = Math.max(min, Math.min(max, value))
  return normalized
}

export const mod = (a: number, b: number) => {
  return ((a % b) + b) % b
}
