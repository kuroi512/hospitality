import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/images/home-helper.png')",
        content: "url('/svg/bg-content.svg')",
        lines: "url('/svg/bg-lines.svg')"
      },
      keyframes: {
        scroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#E54900'
            },
            secondary: {
              DEFAULT: '#150409'
            },
            success: {
              DEFAULT: '#FFFFFF'
            }
          }
        }
      }
    })
  ]
}

export default config
