/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Deep slate
        panel: '#1e293b', // Lighter slate for cards
        panelHover: '#334155',
        primary: '#38bdf8', // Cyan/blue IoT accent
        primaryDark: '#0284c7',
        textMain: '#f8fafc',
        textMuted: '#94a3b8',
        
        // Status colors
        status: {
          green: '#22c55e', // Normal
          amber: '#f59e0b', // Warning
          red: '#ef4444',   // Critical
          blue: '#3b82f6',  // Info
          gray: '#64748b',  // Offline
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(56, 189, 248, 0.3)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.4)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
