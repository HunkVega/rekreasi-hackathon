/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dusk: '#0F3D3E',
        dusk2: '#0A2C2D',
        sand: '#F4ECD8',
        coral: '#FF6B4A',
        coraldark: '#E0512F',
        sun: '#FFC145',
        sky: '#4FB3BF',
        ink: '#17211F',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'ui-rounded', 'sans-serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 12px 0 0 rgba(10,44,45,0.9)',
        panelSm: '0 6px 0 0 rgba(10,44,45,0.9)',
      },
      keyframes: {
        popin: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        popin: 'popin 0.25s ease-out',
        floaty: '3.5s ease-in-out infinite floaty',
        shimmer: 'shimmer 2.5s linear infinite',
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
