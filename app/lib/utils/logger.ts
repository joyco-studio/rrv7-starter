import { useEffect, useMemo } from 'react'
import { isProduction } from '../constants'

export const logger = (ctx: string, enabled = true) => {
  let _enabled = enabled

  return {
    log: (...args: Parameters<typeof console.log>) => {
      if (isProduction || !_enabled) return
      console.log(`[${ctx}]`, ...args)
    },
    warn: (...args: Parameters<typeof console.warn>) => {
      if (isProduction || !_enabled) return
      console.warn(`[${ctx}]`, ...args)
    },
    error: (...args: Parameters<typeof console.error>) => {
      if (isProduction || !_enabled) return
      console.error(`[${ctx}]`, ...args)
    },
    enable: () => {
      _enabled = true
    },
    disable: () => {
      _enabled = false
    },
  }
}

export const useLogger = (ctx: string, enabled = true) => {
  const _logger = useMemo(() => logger(ctx, enabled), [ctx])

  useEffect(() => {
    if (enabled) {
      _logger.enable()
    } else {
      _logger.disable()
    }
  }, [_logger, enabled])

  return _logger
}
