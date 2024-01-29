import { defineApplicationConfig } from '@nop-chaos/vite-config';

export default defineApplicationConfig({
  overrides: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          manualChunks(id) {
            // console.log("id="+id)
            const libs = [
              'amis-editor',
              'monaco-editor',
              'tinymce',
              'codemirror',
              'froala-editor',
              'exceljs',
              'xlsx',
              'office-viewer',
              'ant-design-vue'
            ];
            for (let lib of libs) {
              if (id.includes('node_modules/' + lib + '/')) return lib;
            }

            function include_any(libs) {
              for (let lib of libs) {
                if (id.includes('/node_modules/' + lib + '/')) return true;
              }
              return false;
            }

            // if(include_any(["react","react-dom","react-router"]))
            //    return "react";

            // if (include_any(["lodash","lodash-es","dayjs","axios","js-yaml","clipboard","copy-to-clipboard"])){
            //         return "shared-lib";
            //       }

            if (include_any(['echarts', 'zrender'])) return 'echarts';

            if (include_any(['amis', 'amis-ui', 'amis-formula', 'amis-core', 'video-react']))
              return 'amis';

            //     if (include_any(["vue","vue-router","@vue","pinia"])){
            // console.log("vue,id=:" + id);
            //       return "vue";
            //     }

            if (id.includes('node_modules/@nop-chaos')) {
              return 'nop-sdk';
            }
            // if (id.includes('node_modules')) {
            //		console.log("vendor,id=:" + id);
            //      return "vendor";
            //    }
            if (id.includes('/nop-site/src/') && !id.includes('/.pnpm/')) {
              console.log('nop-site,id=:' + id);
              return 'nop-site';
            }
            //console.log("app,id="+id);
            //return "app"
          }
        }
      }
    }
  }
});
