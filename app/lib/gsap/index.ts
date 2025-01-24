import gsap from 'gsap'

import { useGSAP } from '@gsap/react'
import { isClient } from '@/utils/constants'

// Register all plugins immediately if we're on the client
if (isClient) {
  // Register all plugins at once
  gsap.registerPlugin(useGSAP)

  gsap.config({
    autoSleep: Infinity,
  })

  // gsap.defaults({
  //   ease: 'custom',
  //   duration: DURATION,
  // })

  // ScrollTrigger.config({
  //   ignoreMobileResize: true,
  // })
}

// Export configured gsap instance
export { gsap }

export const promisifyGsap = (tl: GSAPTimeline) => {
  return new Promise<void>((resolve) => {
    tl.then(() => resolve())
  })
}
