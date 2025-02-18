/* eslint-disable no-console */
import express from 'express'
import { config } from 'dotenv'
import { parseArgs } from 'node:util'
import { validateEnv, getEnvWithDefaults } from './app/lib/utils/env.js'

// Load environment variables with sensible defaults
const envResult = config()
if (!envResult.parsed) {
  console.log('No .env file found, using default values')
}

// Validate environment and get defaults
validateEnv()
const env = getEnvWithDefaults()

// Parse CLI arguments
const { values: cliArgs } = parseArgs({
  options: {
    port: {
      type: 'string',
    },
  },
  allowPositionals: true,
})

// Forward all CLI args to Vite
const viteCliArgs = Object.entries(cliArgs)
  .filter(([key]) => key !== 'port') // Remove port from Vite args
  .map(([key, value]) => `--${key}=${value}`)

const PORT = Number.parseInt(cliArgs.port || env.PORT || '3000')

const app = express()
app.disable('x-powered-by')

console.log('Starting development server')
const viteDevServer = await import('vite').then((vite) =>
  vite.createServer({
    server: { middlewareMode: true },
    // Forward CLI args to Vite
    mode: process.env.NODE_ENV,
    configFile: './vite.config.ts',
    ...viteCliArgs,
  })
)

app.use(viteDevServer.middlewares)
app.use(async (req, res, next) => {
  try {
    const source = await viteDevServer.ssrLoadModule('./server/app.ts')
    return await source.default(req, res, next)
  } catch (error) {
    if (typeof error === 'object' && error instanceof Error) {
      viteDevServer.ssrFixStacktrace(error)
    }
    next(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
