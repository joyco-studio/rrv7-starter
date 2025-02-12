import { SITE_URL } from '@/lib/utils/constants'
import { generateMeta, mergeMeta } from '@/lib/utils/meta'
import { usePreservedLoaderData } from '@joycostudio/transitions'
import type { MetaFunction } from 'react-router'

export function loader() {
  const messageCopy = `Read carefully before proceeding. Using this starter will make you a rebel. Possible symptoms may include:

  - Can't stop coding.
  - Getting +1000 aura points.
  - Being unable to follow the rules.
  - Extreme dedication to detail.
  - Loosing -1000 aura points
  `
  const signature = `Made by rebels.`

  return { message: messageCopy, signature }
}

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? [])

  return mergeMeta(
    parentMeta,
    generateMeta({
      title: 'About',
      description: data?.message ?? '',
      image: { url: `${SITE_URL}/about/opengraph-image.png`, width: 1200, height: 630, type: 'image/png' },
    })
  )
}

export default function About() {
  const { message, signature } = usePreservedLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center h-screen pt-header">
      <div className="flex flex-col justify-center items-center mt-10 max-w-2xl p-4">
        <h1 className="text-6xl uppercase font-sans font-bold mb-5">Side Effects</h1>
        <p className="font-mono opacity-50 text-pretty whitespace-pre-wrap text-xs leading-relaxed font-medium uppercase mt-2 max-w-prose">
          {message}
        </p>
        <p className="ml-auto font-mono opacity-50 text-end whitespace-pre-wrap text-xs leading-relaxed font-medium uppercase">
          {signature}
        </p>
      </div>
    </div>
  )
}
