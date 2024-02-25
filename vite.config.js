import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
    }
  },
  test: {
    globals: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "laravel-file-explorer"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "vue"
        }
      }
    }
  }
})
