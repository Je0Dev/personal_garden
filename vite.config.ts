import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({

    plugins: [react(), tailwindcss()],
    base: '/personal_garden/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('react-syntax-highlighter')) return 'syntax-highlighter';
            if (id.includes('node_modules/react-dom')) return 'react-dom';
            if (id.includes('node_modules/react')) return 'react';
            if (id.includes('node_modules/motion')) return 'motion';
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
});
