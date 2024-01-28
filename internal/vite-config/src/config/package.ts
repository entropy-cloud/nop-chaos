import { readPackageJSON } from 'pkg-types';
import { defineConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

import { mergeConfig } from './helper';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

type ExtDefineOptions = DefineOptions | {
  [name:string]:any
}

function definePackageConfig(defineOptions: ExtDefineOptions = {}) {
  const { overrides = {
    // plugins: [ react() ],
    // test: {
    //   globals: true,
    //   environment: 'jsdom',
    //   coverage: {
    //     reporter: [ 'text', 'json', 'html' ]
    //   }
    // }
  } } = defineOptions;
  const root = process.cwd();
  return defineConfig(async () => {
    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(
      root
    );
    const packageConfig: UserConfig = {
      define: {
        'process.env': {}
      },
      build: {
        sourcemap: true,
        minify: false,
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs'
        },
        rollupOptions: {
          external: [
            ...Object.keys(dependencies),
            ...Object.keys(peerDependencies),
            'vue',
            '@vue/reactivity',
            '@vue/shared',
            'vue-router',
            '@nop-chaos/nop-core',
            'systemjs',
            'systemjs/dist/system.js',
            'lru-cache',
            'lodash-es',
            'axios',
            'amis',
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
            'react-dom/client',
            'amis-ui',
            'amis-formula',
            'amis-core',
            'element-plus',
            'lru-cache',
            'urql',
            'copy-to-clipboard',
            'qs',
            'path-to-regexp',
            'pinia',
            'urql',
            'veaury',
            'js-yaml'
          ]
        }
      },
      plugins: [
        react({
          babel: {
            plugins: [
              ["@babel/plugin-proposal-decorators", { version: "2018-09", loose: true, 'decoratorsBeforeExport': true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["@babel/plugin-syntax-decorators", { version: "2018-09" ,'decoratorsBeforeExport': true}],
            ],
          },
        }),
        dts({
          entryRoot: 'src',
          logLevel: 'error'
        })
        // configVisualizerConfig(),
      ],
    };

    const config = mergeConfig(packageConfig, {
      ...overrides
    });
    console.log("merged-config=", JSON.stringify(config,null,"  "))
    return config
  });
}

export { definePackageConfig };
