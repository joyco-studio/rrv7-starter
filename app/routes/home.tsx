import cn from '@/lib/utils/cn'
import { usePreservedLoaderData } from '@joycostudio/transitions'

export function loader() {
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
  return { stack }
}

const Paragraph = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p
      className={cn(
        'text-center font-mono opacity-50 text-pretty whitespace-pre-wrap text-xs leading-relaxed font-medium uppercase mt-2 max-w-prose',
        className
      )}
    >
      {children}
    </p>
  )
}

export default function Home() {
  const { stack } = usePreservedLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center pt-header h-screen bg-accent">
      <div className="flex flex-col justify-center items-center mt-10 p-4">
        <h1 className="font-sans text-6xl uppercase font-bold mb-7">Rebels starter</h1>
        <Paragraph>
          <span className="font-bold">WARNING</span> - By using this template you accept to get:
        </Paragraph>

        <div className="flex gap-2 mt-4 flex-wrap items-center justify-center max-w-lg">
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

        <Paragraph className="mt-8">OK, PROCEED</Paragraph>
        {/* <a
          className=""
          href="https://github.com/new?owner=joyco-studio&template_name=rrv7-starter&template_owner=joyco-studio"
        >
          <Paragraph>Use this template</Paragraph>
        </a> */}
      </div>
    </div>
  )
}
