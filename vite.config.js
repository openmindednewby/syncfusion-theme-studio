import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@api': path.resolve(__dirname, './src/api'),
            '@localization': path.resolve(__dirname, './src/localization'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@config': path.resolve(__dirname, './src/config'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'query-vendor': ['@tanstack/react-query', 'zustand'],
                    'syncfusion-grid': ['@syncfusion/ej2-react-grids'],
                    'syncfusion-inputs': [
                        '@syncfusion/ej2-react-inputs',
                        '@syncfusion/ej2-react-buttons',
                        '@syncfusion/ej2-react-dropdowns',
                    ],
                    'syncfusion-nav': ['@syncfusion/ej2-react-navigations'],
                },
            },
        },
        chunkSizeWarningLimit: 500,
    },
    server: {
        port: 3000,
        open: true,
    },
});
