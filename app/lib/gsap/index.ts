import gsap from 'gsap'

import { useGSAP } from '@gsap/react'
import { isClient } from '@/lib/constants'
import { registerEffects } from './effects'

if (isClient) {
  gsap.registerPlugin(useGSAP)

  /**
   * Force 3D transforms as default.
   */
  gsap.config({
    force3D: true,
  })

  registerEffects(gsap)
}

export { gsap }

export const promisifyGsap = (tl: GSAPTimeline) => {
  return new Promise<void>((resolve) => {
    tl.then(() => resolve())
  })
}
