import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import compressPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    compressPlugin({
      ext: ".gz",
      //deleteOriginFile:true,
      threshold: 1024
    })
  ],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        manualChunks(id) {
          // console.log("id="+id)
          const libs = ["monaco-editor", "tinymce", "codemirror",
            "froala-editor", "exceljs", "xlsx", "office-viewer", "ant-design-vue"];
          for (let lib of libs) {
            if (id.includes("node_modules/" + lib + '/'))
              return lib
          }

          function include_any(libs) {
            for (let lib of libs) {
              if (id.includes("/node_modules/" + lib + '/'))
                return true
            }
            return false
          }



          if (include_any(["echarts", "zrender"]))
            return "echarts"

          if (include_any(["amis", "amis-ui", "amis-formula", "amis-core", 
                 "video-react","amis-editor","amis-editor-core"]))
            return "amis";

          if (id.includes('node_modules/@nop-chaos')) {
            return "nop-sdk";
          }


        }
      }
    }
  }
})
