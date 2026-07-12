/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#4ade80',
          soft: '#86efac',
          deep: '#22c55e',
          glow: 'rgba(74, 222, 128, 0.35)',
        },
        ink: {
          DEFAULT: '#050708',
          50: '#0c1013',
          100: '#0f1419',
          200: '#141a21',
          300: '#1b232c',
          400: '#242e39',
          border: 'rgba(255, 255, 255, 0.08)',
          borderStrong: 'rgba(255, 255, 255, 0.14)',
        },
        mist: {
          DEFAULT: '#e6ebf0',
          muted: '#9aa5b1',
          dim: '#5f6b78',
        },
        amber: {
          DEFAULT: '#fbbf24',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgba(5,7,8,0) 0%, #050708 85%)',
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 40px rgba(74, 222, 128, 0.25)',
        'glow-lg': '0 0 80px rgba(74, 222, 128, 0.3)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
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
