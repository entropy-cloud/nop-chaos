import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { readFile, writeFile } from 'node:fs/promises';

const dtsFiles = [
  "../nop-core/lib/index.d.ts",
  "../nop-amis-vue/lib/index.d.ts"
]

async function mergeDts(){
  let content = "";
  for(let file of dtsFiles){
    const dtsContent = await readFile(file,"utf-8")
    content += dtsContent.replace("export { }","\n")
  }
  await writeFile("./lib/sdk.d.ts",content)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      outDir: "lib",
      async afterBuild(){
        return mergeDts()
      }
    })
  ],

  build: {
    lib: {
      name: '@nop-chaos/sdk',
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
      external: ['vue', '@vue/reactivity', '@vue/shared', 'vue-router',
        'systemjs', 'systemjs/dist/system.js', 'lru-cache', 'lodash-es',
        'axios', 'amis', 'react', 'react-dom', 'react-dom/client', 'amis-ui', 'amis-formula', 'amis-core',
        'element-plus', 'lru-cache', 'urql', 'copy-to-clipboard',
        'qs', 'path-to-regexp', 'pinia', 'urql', 'veaury', 'js-yaml'],
    },
  },
})
