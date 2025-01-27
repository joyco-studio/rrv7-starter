import type { MetaDescriptor } from 'react-router'

export const mergeMeta = (parentMeta: MetaDescriptor[], metaTags: MetaDescriptor[]) => {
  const merged = new Map<string, MetaDescriptor>()

  const getMetaKey = (meta: MetaDescriptor) => {
    if ('name' in meta) return `name:${meta.name}`
    if ('property' in meta) return `property:${meta.property}`
    return Object.keys(meta)[0]
  }

  parentMeta.forEach((meta) => {
    merged.set(getMetaKey(meta), meta)
  })

  metaTags.forEach((meta) => {
    merged.set(getMetaKey(meta), meta)
  })

  return Array.from(merged.values())
}

export const generateOpenGraphImageTags = (
  url: string,
  config?: { width?: number; height?: number; title?: string; description?: string; url?: string }
) => {
  const defaultConfig = {
    width: 1200,
    height: 630,
  }

  const { width, height } = { ...defaultConfig, ...config }

  return [
    { name: 'og:image', content: url },
    { name: 'og:image:width', content: width.toString() },
    { name: 'og:image:height', content: height.toString() },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: url },
  ]
}
