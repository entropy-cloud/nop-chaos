import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: '@nop-chaos/nop-server-tool',
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
         minifyInternalExports: false
      }
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      // external: ['vue', '@vue/shared', 'lodash', 'axios'],
    },
  },
})
