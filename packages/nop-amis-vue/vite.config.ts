import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),dts({ rollupTypes: true,logDiagnostics: true,outDir:"lib" })],

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
      external: ['vue', '@vue/reactivity','@vue/shared','vue-router', '@nop-chaos/nop-core',
          'systemjs','systemjs/dist/system.js','lru-cache','lodash-es',
          'axios', 'amis','react','react-dom','react-dom/client','amis-ui','amis-formula','amis-core',
          'element-plus','lru-cache','urql','copy-to-clipboard',
          'qs','path-to-regexp','pinia','urql','veaury','js-yaml'],
    },
  },
})
