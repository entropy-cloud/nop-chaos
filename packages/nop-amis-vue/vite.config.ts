import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: '@nop-chaos/nop-amis-vue',
      formats: ['es'],
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
         minifyInternalExports: false,
         globals:{},
         dir: "lib"
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['vue', '@vue/reactivity','@vue/shared','vue-router', 
          'axios', 'amis','react','react-dom','amis-ui','amis-formula','amis-core'],
    },
  },
})
