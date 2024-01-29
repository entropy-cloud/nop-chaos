import UnoCSS from 'unocss/vite';
import { type UserConfig } from 'vite';

const commonConfig: (mode: string) => UserConfig = (mode) => ({
  server: {
    host: true,
  },
  esbuild: {
    drop: mode === 'production' ? ['debugger'] : [],
  },
  build: {
    reportCompressedSize: true,
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      // TODO: Prevent memory overflow
      maxParallelFileOps: 3,
    },
  },
  plugins: [UnoCSS()],
});

export { commonConfig };
