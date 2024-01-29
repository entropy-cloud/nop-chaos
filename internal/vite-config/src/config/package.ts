import { readPackageJSON } from 'pkg-types';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { commonConfig } from './common';
import { mergeConfigEx } from './helper';

interface DefineOptions {
  overrides?: UserConfig;
  options?: {
    //
  };
}

function definePackageConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;
  const root = process.cwd();
  return defineConfig(async ({ mode }) => {
    const { dependencies = {}, peerDependencies = {} } = await readPackageJSON(root);
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: () => 'index.mjs',
        },
        rollupOptions: {
          external: [...Object.keys(dependencies), ...Object.keys(peerDependencies),
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
          ],
        },
      },
      plugins: [
        dts({
          logLevel: 'error',
        }),
      ],
    };
    const mergedConfig = mergeConfig(commonConfig(mode), packageConfig);

    return mergeConfigEx(mergedConfig, overrides);
  });
}

export { definePackageConfig };
