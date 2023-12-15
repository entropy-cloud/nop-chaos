import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],// , dts({ rollupTypes: true, logLevel: 'info', outDir: "lib" })],

  build: {
    lib: {
      name: '@nop-chaos/nop-react-core',
      formats: ['es'],
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
        minifyInternalExports: false,
        globals: {},
        dir: "lib"
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['vue', '@vue/shared', 'vue-router', 'axios', 'systemjs', 'systemjs/dist/system.js', 'lru-cache', 'lodash-es',
        'qs', 'path-to-regexp', 'pinia', 'urql', 'react', 'react-dom', 'react/jsx-runtime', 'antd',
      "amis","amis-ui","amis-core","amis-formula"],
    },
  },
})
