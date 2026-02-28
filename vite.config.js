import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            port: 5173,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        },
        headers: {
            'Service-Worker-Allowed': '/',
        }
    }
});
