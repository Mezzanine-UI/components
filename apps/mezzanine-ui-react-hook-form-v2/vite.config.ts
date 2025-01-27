/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/mezzanine-ui-react-hook-form-v2',
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
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
      name: '@mezzanine-ui/react-hook-form-v2',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-hook-form',
        'lodash',
        'yup',
        '@hookform/error-message',
        '@hookform/resolvers',
        '@mezzanine-ui/system',
        '@mezzanine-ui/icons',
        '@mezzanine-ui/react',
        '@mezzanine-ui/core',
      ],
      output: {
        externalLiveBindings: false,
      },
    },
    outDir: '../../dist/apps/@mezzanine-ui/react-hook-form-v2',
  },
});
