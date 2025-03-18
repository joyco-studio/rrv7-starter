import { isProduction } from '../constants'

export const logger = (ctx: string) => {
  return {
    log: (...args: Parameters<typeof console.log>) => {
      if (isProduction) return
      console.log(`[${ctx}]`, ...args)
    },
    warn: (...args: Parameters<typeof console.warn>) => {
      if (isProduction) return
      console.warn(`[${ctx}]`, ...args)
    },
    error: (...args: Parameters<typeof console.error>) => {
      if (isProduction) return
      console.error(`[${ctx}]`, ...args)
    },
  }
}
