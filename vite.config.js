import { fileURLToPath, URL } from 'node:url'
import { splitVendorChunkPlugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { hash } from './src/helper.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        }
      ]
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  },
})
