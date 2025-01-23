import { reactRouter } from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import babel from 'vite-plugin-babel'
import bundleAnalyzer from 'vite-bundle-analyzer'

const ReactCompilerConfig = {}

export default defineConfig(({ isSsrBuild, command }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  ssr: {
    noExternal: command === 'build' ? true : undefined,
  },
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'], // if you use TypeScript
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tsconfigPaths(),
    ...(process.env.ANALYZE === 'true'
      ? [bundleAnalyzer({ analyzerMode: 'static', openAnalyzer: false, reportTitle: 'Client Bundle Analyzer' })]
      : []),
  ],
}))
