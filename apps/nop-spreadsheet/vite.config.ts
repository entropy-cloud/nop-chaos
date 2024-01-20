import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import compressPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    compressPlugin({
      ext: ".gz",
      deleteOriginFile:true,
      threshold: 1024
    })
  ],
})
