import { usePreservedLoaderData } from '@joycostudio/transitions'

export function loader() {
  const message = `
  This is the starter we use everyday to build the most badass websites. What you will get:
  `
  const stack = [
    {
      label: 'react-router v7',
      link: 'https://reactrouter.com/start/framework/installation',
    },
    {
      label: 'react 19 + compiler',
      link: 'https://react.dev/reference/react',
    },
    {
      label: 'tailwindcss',
      link: 'https://tailwindcss.com/docs/installation/using-vite',
    },
    {
      label: 'gsap',
      link: 'https://gsap.com/docs/v3/gsap-core/',
    },
    {
      label: 'eslint + prettier',
      link: 'https://eslint.org/docs/latest/use/getting-started',
    },
    {
      label: 'page transitions',
      link: 'https://www.npmjs.com/package/@joycostudio/transitions',
    },
    {
      label: '+ 1000 aura',
      link: 'https://www.youtube.com/watch?v=0v1BJEqO6h0',
    },
  ]
  return { message, stack }
}

export default function Home() {
  const { message, stack } = usePreservedLoaderData<typeof loader>()
  return (
    <div className="flex flex-col items-center pt-header h-screen bg-accent">
      <div className="flex flex-col justify-center items-center mt-10 p-4">
        <h1 className="font-sans text-6xl uppercase font-bold mb-2">Rebels starter</h1>
        <p className="text-center font-mono opacity-50 text-pretty whitespace-pre-wrap text-xs leading-relaxed font-medium uppercase mt-2 max-w-prose">
          {message}
        </p>
        <div className="flex gap-2 flex-wrap items-center justify-center max-w-lg">
          {stack.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase bg-primary text-accent py-1 px-3"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
