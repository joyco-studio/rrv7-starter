import { prependProtocol } from '@/lib/utils'

export const isServer = typeof window === 'undefined'

export const isClient = typeof window !== 'undefined'

export const isDevelopment = import.meta.env.NODE_ENV === 'development'

export const SITE_URL = prependProtocol(__vercel.url || import.meta.env.VITE_SITE_URL)

if (!SITE_URL) {
  throw new Error('VITE_SITE_URL is not set')
}

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
