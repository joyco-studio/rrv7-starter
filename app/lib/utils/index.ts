export const noop = () => { }

export const prependProtocol = (url: string | undefined) => {
  if (!url) return undefined

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}
