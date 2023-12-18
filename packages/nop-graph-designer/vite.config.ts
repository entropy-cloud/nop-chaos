import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true,outDir:"lib" })],

  build: {
    lib: {
      name: '@nop-chaos/nop-amis-ext',
      formats: ['es'],
      entry: 'src/index.ts',
    },

    minify: false,

    rollupOptions: {
      output: {
         minifyInternalExports: false,
         dir: "lib"
      },
      // Do not bundle third-party dependencies,
      // since server packages can get them via npm install
      external: ['react', 'amis', 'amis-ui', 'amis-core','@nop-chaos/nop-react-core','@nop-chaos/nop-core'],
    },
  },
})
