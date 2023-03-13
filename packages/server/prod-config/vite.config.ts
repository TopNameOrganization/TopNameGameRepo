import { defineConfig } from 'vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '..', '..', 'dist', 'server'),
    rollupOptions: {
      input: 'src/index.ts',
    },
  },
})
