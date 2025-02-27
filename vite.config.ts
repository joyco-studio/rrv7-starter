import { reactRouter } from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import babel from 'vite-plugin-babel'
import bundleAnalyzer from 'vite-bundle-analyzer'

export default defineConfig(({ command }) => ({
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  define: {
    /*
      Vercel env variables are only available on the server and at build time,
      so we need to define them here to make them available on the client.
    */
    __vercel: JSON.stringify({
      /* On prod, use the project production url, on dev, use the deployment url */
      url: process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL,
      env: process.env.VERCEL_ENV,
    }),
  },
  ssr: {
    /* 
      - On prod build, we want to bundle all libraries.
      - On dev build, libraries are externalized to speed up the build. But some of them might need
        to be transpiled for module compatibility on the server, so include them in the dev bundle.

      https://vite.dev/config/ssr-options#ssr-noexternal
    */
    noExternal: command === 'build' ? true : ['gsap'],
  },
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tsconfigPaths(),
    ...(process.env.ANALYZE === 'true'
      ? [bundleAnalyzer({ analyzerMode: 'static', openAnalyzer: false, reportTitle: 'Client Bundle Analyzer' })]
      : []),
  ],
}))
