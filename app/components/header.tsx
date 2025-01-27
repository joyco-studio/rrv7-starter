import routes from '@/routes'
import { Link } from 'react-router'
export const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center justify-center h-header">
        <ul className="flex items-center gap-6 font-mono uppercase">
          {routes.map((route) => (
            <li className="text-sm" key={route.path}>
              <Link to={route.path ?? ''}>{route.path?.replace('/', '') ?? 'Home'}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
