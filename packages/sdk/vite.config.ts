import { definePackageConfig } from '@nop-chaos/vite-config';

import vue from '@vitejs/plugin-vue'

export default definePackageConfig({
    overrides:{
        build:{
            rollupOptions: {
                "!external": [
                  'vue',
                  '@vue/reactivity',
                  '@vue/shared',
                  'vue-router',
                  'systemjs',
                  'systemjs/dist/system.js',
                  'lru-cache',
                  'axios',
                  'amis',
                  'react',
                  'react-dom',
                  'react/jsx-dev-runtime',
                  'react/jsx-runtime',
                  'react-dom/client',
                  'amis-ui',
                  'amis-formula',
                  'amis-core',
                  'element-plus',
                  'lru-cache',
                  'copy-to-clipboard',
                  'qs',
                  'path-to-regexp',
                  'urql',
                  'pinia',
                  'urql',
                  'veaury',
                  'js-yaml'
                ]
              }
        },
        "!plugins":[
          vue()
        ]
    }
});
