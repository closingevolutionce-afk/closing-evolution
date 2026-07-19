/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        volt: {
          DEFAULT: '#8a5cf6',
          soft: '#b7a6ff',
          deep: '#6d3fe0',
          glow: 'rgba(138, 92, 246, 0.35)',
        },
        // Nommé "coral" historiquement, ce token est maintenant un rose/magenta
        // (la marque est restée dans la famille violet-rose, plus de rouge/orange).
        coral: {
          DEFAULT: '#ec4899',
          soft: '#f472b6',
          deep: '#be185d',
        },
        ink: {
          DEFAULT: '#241d4a',
          50: '#2a2352',
          100: '#332a5f',
          200: '#3e3372',
          300: '#493c85',
          400: '#554797',
          border: 'rgba(255, 255, 255, 0.14)',
          borderStrong: 'rgba(255, 255, 255, 0.26)',
        },
        mist: {
          DEFAULT: '#f1eefb',
          muted: '#a79cc9',
          dim: '#6e6389',
        },
        // Idem pour "amber" : maintenant un fuchsia, plus de jaune/doré.
        amber: {
          DEFAULT: '#d946ef',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgba(36,29,74,0) 0%, #241d4a 85%)',
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'volt-gradient': 'linear-gradient(90deg, #ec4899, #a480ff)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(164, 128, 255, 0.4)',
        'glow-lg': '0 0 80px rgba(164, 128, 255, 0.46)',
        card: '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 40px -20px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '10px',
        '3xl': '14px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.06)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
