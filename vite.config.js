import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
 base: './',
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
            return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')){
            return 'assets/css/[name]-[hash][extname]';
          }
 
          return 'assets/[name]-[hash][extname]';
        },
      }
    }
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
});
