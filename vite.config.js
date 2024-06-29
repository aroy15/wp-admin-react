import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import chokidar from 'chokidar';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/css/[name].[ext]',
        chunkFileNames: 'assets/js/[name].js',
      },
    },
  },
  publicDir: false, // Disable public directory
});

const watchFiles = () => {
  chokidar.watch('src/**/*').on('change', () => {
    console.log('Files changed, rebuilding...');
  });
};

// if (process.env.NODE_ENV === 'development') {
  watchFiles();
// }
