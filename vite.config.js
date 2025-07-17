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
      // בקשות רישום לאירועים - לשרת הדוט-נט
      '/api/EventRegistrations': {
        target: 'https://localhost:7278',
        changeOrigin: true,
        secure: false,
      },
      // בקשות אירועים - לשרת הדוט-נט
      '/api/events': {
        target: 'https://localhost:7278',
        changeOrigin: true,
        secure: false,
      },
      // בקשות למשתמשים - Node.js
      '/users': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      // כל שאר בקשות ה-API הולכות לשרת Node.js
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      // בקשות אימות LinkedIn
      '/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
