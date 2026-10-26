import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base must match the GitHub repo name for GitHub Pages to work
  base: '/scholarship-finder/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
