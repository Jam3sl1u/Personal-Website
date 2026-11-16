import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path.
// The default './' (relative) works everywhere without changes:
//   - user site:     https://jam3sl1u.github.io/
//   - project site:  https://jam3sl1u.github.io/<repo>/
//   - custom domain: https://example.com/
// That is possible because routing is hash-based (see src/App.tsx), so every
// page is served from the same index.html and relative asset URLs always resolve.
// Set VITE_BASE (for example "/Personal-Website/") only if you need absolute URLs.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
