import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
  type MetaDescriptor,
  type MetaFunction,
} from 'react-router'

import type { Route } from './+types/root'
import stylesheet from './app.css?url'
import { RouteTransitionManager, usePreservedLoaderData } from '@joycostudio/transitions'
import routes from './routes'
import { promisifyGsap } from './lib/gsap'
import gsap from 'gsap'
import { Header } from './components/header'
import Footer from './components/footer'
import { WATERMARK } from './lib/utils/constants'
import { generateOpenGraphImageTags } from './lib/utils/meta'
export const links: Route.LinksFunction = () => [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
]

export const loader = () => {
  return { rebelLog: WATERMARK }
}

export const meta: MetaFunction<typeof loader> = () => {
  const metaTags: MetaDescriptor[] = [
    {
      title: 'Rebels starter',
    },
    {
      name: 'description',
      content: 'A react-router v7 starter made by rebels for rebels.',
    },
    ...generateOpenGraphImageTags('./opengraph-image.png'),
  ]

  return metaTags
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { rebelLog } = usePreservedLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer log={rebelLog} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const element = useOutlet()

  const location = useLocation()

  return (
    <RouteTransitionManager
      appear
      routes={routes} /* If nothing matches create a dummy ref, so 404 kicks in */
      pathname={location.pathname}
      onEntering={{
        default: () => {
          window.scrollTo({ top: 0 })
          // useLenis.getState().scrollTo(0, { immediate: true, programmatic: true });
          // scroll.unlock();
        },
      }}
      onEnter={{
        default: (node) => {
          return promisifyGsap(
            gsap
              .timeline({
                onComplete: () => {
                  gsap.set(node, { clearProps: 'all' })
                },
              })
              .fromTo(node, { opacity: 0 }, { opacity: 1, duration: 1 })
          )
        },
      }}
      onExit={{
        default: (node) => {
          return promisifyGsap(gsap.timeline().fromTo(node, { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0))
        },
      }}
    >
      {(ref) => (
        <main className="overflow-y-clip flex flex-col min-h-svh" data-pathname={location.pathname} ref={ref}>
          {element}
        </main>
      )}
    </RouteTransitionManager>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
