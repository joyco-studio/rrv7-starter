import { effects } from '../effects'

type TimelineChild = string | GSAPAnimation | GSAPCallback | Array<string | GSAPAnimation | GSAPCallback>

declare global {
  export type GSAPEffect<TConfig = object> = {
    effect: (node: GSAPTweenTarget, config?: TConfig) => TimelineChild
    defaults?: TConfig
    extendTimeline: boolean
  }

  type InferConfigFromGSAPEffect<T> = T extends GSAPEffect<infer U> ? U : never

  type RegisteredGSAPEffects = {
    [K in keyof typeof effects]: (
      node: GSAPTweenTarget,
      config?: InferConfigFromGSAPEffect<(typeof effects)[K]>
    ) => TimelineChild
  }
}

export {}
