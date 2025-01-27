import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FAFAFA',
        background: '#181617',
        accent: '#0344DC',
      },
      fontFamily: {
        sans: [
          '"Barlow Condensed"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      spacing: {
        header: '100px',
      },
    },
  },
  plugins: [],
} satisfies Config
