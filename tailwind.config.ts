import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#E4B44B',
          light: '#F0C76A',
          dark: '#A07810',
          muted: '#8A6A12',
        },
        warm: '#EFEBE2',
        vlm: {
          black: '#0A0A0A',
          dark: '#111111',
          card: '#161616',
          hover: '#1C1C1C',
          border: '#252525',
          'border-light': '#333333',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        sans: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
