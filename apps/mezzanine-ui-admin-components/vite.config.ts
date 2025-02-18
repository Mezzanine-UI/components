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
  resolve: {
    alias: {
      '~@mezzanine-ui': '@mezzanine-ui',
    },
  },
  build: {
    reportCompressedSize: true,
    lib: {
      entry: 'src/index.ts',
      name: '@mezzanine-ui/admin-components',
      fileName: 'index',
      cssFileName: 'style',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        'lodash',
        'yup',
        // 'react-dnd',
        // 'react-dnd-html5-backend',
        '@mezzanine-ui/login-panel',
        '@mezzanine-ui/react-hook-form-v2',
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
    outDir: '../../dist/apps/@mezzanine-ui/admin-components',
  },
});
