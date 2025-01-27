import type { loader } from '@/root'
import routes from '@/routes'
import { usePreservedLoaderData } from '@joycostudio/transitions'
import { Link } from 'react-router'

export const Header = () => {
  const { mediaLinks } = usePreservedLoaderData<typeof loader>()

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between md:grid grid-cols-3 p-2 px-4 md:py-4 md:items-center h-header">
      <div className="flex gap-3 md:contents">
        <Link key="logo" to="/" className="h-4 md:justify-self-start">
          <img src="/logo.svg" alt="Rebels logo" className="size-full" />
        </Link>
        <nav className="flex items-center justify-center md:justify-self-center">
          <ul className="flex items-center gap-3 md:gap-6 font-mono uppercase">
            {routes.map((route) => (
              <li key={route.path} className="text-sm">
                <Link to={route.path ?? ''}>{route.path?.replace('/', '') ?? 'Home'}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="flex items-center gap-3 md:gap-6 font-mono uppercase md:justify-self-end">
        {mediaLinks.map((link) => (
          <li key={link.label} className="text-sm">
            <Link className="underline underline-offset-4" to={link.link} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
