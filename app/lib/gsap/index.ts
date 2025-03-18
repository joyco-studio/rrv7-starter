import gsap from 'gsap'

import { useGSAP } from '@gsap/react'
import { isClient } from '@/lib/constants'
import { registerEffects } from './effects'

if (isClient) {
  gsap.registerPlugin(useGSAP)

  gsap.config({
    force3D: true,
  })

  CustomEase.create('softFlowEase', '0.51, 0.00, 0.10, 1.00')
  CustomEase.create('dynamicGlide', '0.57, 0.00, 0.11, 1.00')
  CustomEase.create('sharpRise', '0.33, 0.00, 0.15, 1.00')

  registerEffects(gsap)
}

export { gsap }

export const promisifyGsap = (tl: GSAPTimeline) => {
  return new Promise<void>((resolve) => {
    tl.then(() => resolve())
  })
}
