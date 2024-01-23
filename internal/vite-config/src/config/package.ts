import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
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
              ["@babel/plugin-proposal-decorators", { version: "2018-09", loose: true}],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["@babel/plugin-syntax-decorators", {  version: "2018-09" }],
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

    return mergeConfig(packageConfig, {
      ...overrides
    });
  });
}

export { definePackageConfig };
