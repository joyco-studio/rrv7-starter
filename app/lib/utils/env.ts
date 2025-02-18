type EnvVar = {
  key: string
  defaultValue?: string
  required?: boolean
  description: string
}

const envVars: EnvVar[] = [
  {
    key: 'PORT',
    defaultValue: '3000',
    description: 'Port number for the development server',
  },
  {
    key: 'VITE_SITE_URL',
    defaultValue: 'localhost:3000',
    description: 'Base URL for the frontend application',
  },
  {
    key: 'VITE_VERCEL_URL',
    description: 'URL provided by Vercel in production',
  },
  {
    key: 'VITE_VERCEL_PROJECT_PRODUCTION_URL',
    description: 'Production URL for the Vercel project',
  },
]

export function validateEnv() {
  const missingRequired: string[] = []
  const warnings: string[] = []

  envVars.forEach((envVar) => {
    const value = process.env[envVar.key]
    if (!value && !envVar.defaultValue) {
      if (envVar.required) {
        missingRequired.push(envVar.key)
      } else {
        warnings.push(`${envVar.key} is not set (${envVar.description})`)
      }
    }
  })

  if (missingRequired.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingRequired
        .map((key) => `  - ${key}`)
        .join('\n')}\n\nPlease set these variables in your .env file.`
    )
  }

  if (warnings.length > 0) {
    console.warn('Environment warnings:\n', warnings.join('\n'))
  }
}

export function getEnvWithDefaults() {
  const env: Record<string, string> = {}

  envVars.forEach((envVar) => {
    env[envVar.key] = process.env[envVar.key] || envVar.defaultValue || ''
  })

  return env
}
