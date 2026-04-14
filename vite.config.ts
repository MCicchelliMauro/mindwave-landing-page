import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      // En desarrollo: redirige /api/* a Vercel CLI (puerto 3000 de vercel dev)
      // Usá `vercel dev` en vez de `npm run dev` para que las funciones corran juntas
      // Si preferís correr separado: cambiar el target al puerto donde corra vercel dev
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animations': ['framer-motion', 'gsap', '@gsap/react'],
        },
      },
    },
  },
});
