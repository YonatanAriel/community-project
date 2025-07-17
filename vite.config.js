import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // רק בקשות אירועים עוברות לשרת ה-.NET
      '/api/events': {
        target: 'https://localhost:7278',
        changeOrigin: true,
        secure: false,
      },
      // כל שאר בקשות ה-API הולכות לשרת Node.js
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
