import { prependProtocol } from '../utils'
import { getEnvWithDefaults } from './env'

export const isServer = typeof window === 'undefined'
export const isClient = typeof window !== 'undefined'

const env = getEnvWithDefaults()

const base_url = env.VITE_VERCEL_PROJECT_PRODUCTION_URL || env.VITE_VERCEL_URL || env.VITE_SITE_URL

if (!base_url) {
  throw new Error(
    'VITE_SITE_URL is not set. This environment variable is required for the frontend to function properly.'
  )
}

export const SITE_URL = prependProtocol(base_url)
export const WATERMARK = `             
             .;5####57..                        
            .5#########;.                       
            ;###########                        
            ;###########.                       
            .;#######N5.                        
  .;;;..      .;75557..                  .;;;.  
.5######;                             .;######5.
#########;                            ;#########
##########..                        ..##########
;##########;                        ;##########;
.7##########5;.                  .;5#########N7 
 .7############7;..           .;7#N##########7. 
   ;###############5577777755#############N#;.  
    .7####################################7.    
     ..;5#N############################5;.      
         .;7########################7;..        
             .;;755##########557;;...           

              Made by joyco.studio              `
