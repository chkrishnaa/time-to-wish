import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure environment variables are available
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
})
