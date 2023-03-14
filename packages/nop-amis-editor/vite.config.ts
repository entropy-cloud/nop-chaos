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
      //deleteOriginFile:true,
      threshold: 1024
    })
  ],
  build:{
    rollupOptions: {
      output: {
        manualChunks(id) {
          console.log("id="+id)
          if (id.includes('node_modules')) {
            return "vendor"; 
          }
          if (id.includes('/nop-amis-editor/src/')) {
            return "source"; 
          }
        }
      }
    }
  }
})
