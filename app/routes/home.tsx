import { usePreservedLoaderData } from '@joycostudio/transitions'

export function loader() {
  const message = `
  This is the starter we use everyday to build the most badass websites.
  Proceed with caution, as using this starter will make you a rebel. Some of the symptoms include:
  - You will start to see the world in a different way.
  - You will start to see the world in a different way.
  - You will start to see the world in a different way.
  - You will start to see the world in a different way.
  - You will start to see the world in a different way.

  Made by rebels.
  `
  return { message }
}

export default function Home() {
  const { message } = usePreservedLoaderData<typeof loader>()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl uppercase font-bold mb-5">Rebels starter</h1>
        <p className="text-center font-mono opacity-50 text-pretty whitespace-pre-wrap text-xs leading-relaxed font-medium uppercase mt-2 max-w-prose">
          {message}
        </p>
      </div>
    </div>
  )
}
