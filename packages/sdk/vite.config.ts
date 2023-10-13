import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { readFile, writeFile } from 'node:fs/promises';

import fs from 'node:fs'
import path from 'node:path'

const dtsFiles = [
  "../nop-core/lib/index.d.ts",
  "../nop-amis-vue/lib/index.d.ts"
]


function copyDirectory(sourceDir, targetDir) {
  // 确保目标目录存在，如果不存在则创建
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  // 读取源目录中的所有文件和子目录
  const files = fs.readdirSync(sourceDir);

  // 遍历源目录中的每个文件和子目录
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // 如果当前项是一个子目录，则递归调用copyDirectory函数
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      // 如果当前项是一个文件，则直接拷贝并覆盖目标文件
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

function copyPackageJson(){
  const json = JSON.parse(fs.readFileSync("./package.json","utf-8"))
  for(const k in json.dependencies){
    if(k.startsWith("@nop-chaos")){
      delete json.dependencies[k]
    }
  }
  fs.writeFileSync('../../nop-sdk/package.json',JSON.stringify(json,null,'  '))
}


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
        // 将所有的d.ts文件合并到sdk.d.ts中
        await mergeDts()
        // 将编译结果拷贝到外部的nop-sdk目录中
        copyDirectory('./lib','../../nop-sdk/lib')
        copyPackageJson()
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
