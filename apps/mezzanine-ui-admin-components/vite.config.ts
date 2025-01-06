/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mezzanine-ui-admin-components',
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  build: {
    reportCompressedSize: true,
    lib: {
      entry: 'src/index.ts',
      name: '@mezzanine-ui/admin-components',
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
    outDir: '../../dist/apps/@mezzanine-ui/admin-components',
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    // },
  },
});
