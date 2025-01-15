/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mezzanine-ui-login-panel',
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  resolve: {
    alias: {
      '~@mezzanine-ui': '@mezzanine-ui',
    },
  },
  build: {
    reportCompressedSize: true,
    lib: {
      entry: 'src/index.ts',
      name: '@mezzanine-ui/login-panel',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-hook-form',
        'lodash',
        '@mezzanine-ui/system',
        '@mezzanine-ui/icons',
        '@mezzanine-ui/react',
        '@mezzanine-ui/core',
        '@hookform/error-message',
        'tslib',
      ],
      output: {
        externalLiveBindings: false,
      },
    },
    outDir: '../../dist/apps/@mezzanine-ui/login-panel',
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    // },
  },
});
