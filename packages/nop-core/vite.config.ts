import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true,logDiagnostics: true,outDir:"lib" })],

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
         globals:{},
         dir: "lib"
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['vue', '@vue/shared', 'vue-router','axios','systemjs','systemjs/dist/system.js','lru-cache','lodash-es',
        'qs','path-to-regexp','pinia','urql'],
    },
  },
})
