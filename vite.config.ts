import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { postsManifestPlugin } from './vite-plugins/posts-manifest.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), postsManifestPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
