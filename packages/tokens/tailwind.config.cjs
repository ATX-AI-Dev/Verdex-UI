/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,vue,jsx,tsx}",
    "../**/src/**/*.{html,js,ts,vue,jsx,tsx}",
    "../../examples/**/*.{html,js,ts,vue}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        vx: {
          bg: 'var(--vx-bg)',
          paper: 'var(--vx-paper)',
          paper2: 'var(--vx-paper2)',
          chrome: 'var(--vx-chrome)',
          ink: 'var(--vx-ink)',
          muted: 'var(--vx-muted)',
          line: 'var(--vx-line)',
          'line-2': 'var(--vx-line-2)',
          fill: 'var(--vx-fill)',
          'fill-2': 'var(--vx-fill-2)',
          accent: 'var(--vx-accent)',
          'accent-dim': 'var(--vx-accent-dim)',
          'accent-ink': 'var(--vx-accent-ink)',
          warn: 'var(--vx-warn)',
          err: 'var(--vx-err)',
          info: 'var(--vx-info)',
        }
      },
      fontFamily: {
        sans: ['var(--vx-font-sans)', 'Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--vx-font-mono)', 'Space Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'vx-sm': 'var(--vx-radius-sm)',
        'vx': 'var(--vx-radius)',
        'vx-lg': 'var(--vx-radius-lg)',
      },
      boxShadow: {
        'vx': 'var(--vx-shadow)',
      }
    },
  },
  plugins: [],
}
