/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f4fc',
          200: '#b9e6f9',
          300: '#75cdf4',
          400: '#2ea3d9', // Official Vivid Sky Cyan #2ea3d9
          500: '#016a97', // Official Deep Ocean Blue #016a97
          600: '#01557a',
          700: '#014260',
          800: '#26335d', // Official Brand Navy #26335d
          900: '#1b2443',
          950: '#0f152a',
        },
        fasttrack: {
          black: '#000000',
          navy: '#26335d',
          blue: '#016a97',
          cyan: '#2ea3d9',
        },
        electric: {
          cyan: '#2ea3d9',
          blue: '#016a97',
          navy: '#26335d',
          amber: '#ffb300',
          emerald: '#10b981',
          purple: '#8b5cf6',
          coral: '#ff4b72'
        },
        dark: {
          900: '#0a0e1a',
          850: '#0f1629',
          800: '#151f38',
          750: '#26335d', // Brand Navy
          700: '#2d3b68',
          600: '#3d4e82'
        }
      },
      fontFamily: {
        sans: ['Nexa', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Nexa', 'Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        nexa: ['Nexa', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'radar-sweep': 'radarSweep 3s linear infinite',
        'road-scroll': 'roadScroll 1.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 15px rgba(12, 143, 233, 0.6))' },
          '50%': { opacity: 0.6, filter: 'drop-shadow(0 0 5px rgba(12, 143, 233, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        roadScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        }
      }
    },
  },
  plugins: [],
}
