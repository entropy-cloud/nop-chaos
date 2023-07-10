import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: '@nop-chaos/nop-amis-ext',
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
         minifyInternalExports: false
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['react', 'amis', 'amis-ui', 'amis-core'],
    },
  },
})
