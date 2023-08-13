import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: '@nop-chaos/nop-core',
      formats: ['es'],
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
         minifyInternalExports: false,
         globals:{}
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['vue', '@vue/shared', 'axios','systemjs','systemjs/dist/system.js','lru-cache','lodash-es','qs'],
    },
  },
})
