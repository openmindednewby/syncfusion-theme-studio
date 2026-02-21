import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { analyzer } from 'vite-bundle-analyzer';
import { compression } from 'vite-plugin-compression2';
import { VitePWA } from 'vite-plugin-pwa';

// Note: Google Fonts are stripped post-build by scripts/strip-google-fonts.js

export default defineConfig(({ mode }: ConfigEnv) => {
  const pwaPlugin = VitePWA({
    registerType: 'prompt',
    includeAssets: ['favicon.svg', 'icons/*.png', 'screenshots/*.png'],
    manifest: {
      name: 'Syncfusion Theme Studio',
      short_name: 'Theme Studio',
      description: 'Design and customize React admin portal themes with live preview',
      theme_color: '#3B82F6',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      categories: ['design', 'developer tools'],
      icons: [
        { src: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
        { src: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/icon-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      screenshots: [
        { src: '/screenshots/desktop.png', sizes: '1280x720', type: 'image/png', form_factor: 'wide' },
        { src: '/screenshots/mobile.png', sizes: '390x844', type: 'image/png', form_factor: 'narrow' },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
      navigateFallback: 'index.html',
      navigateFallbackAllowlist: [/^\/(?!api)/],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          urlPattern: /^https:\/\/.*\/api\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 },
          },
        },
      ],
    },
  });

  return {
    plugins: [
      react(),
      ...pwaPlugin,
      mode === 'analyze' && analyzer({
        analyzerMode: 'static',
        fileName: 'reports/bundle-analysis',
        openAnalyzer: false,
      }),
      // Gzip and Brotli compression for production builds
      compression({
        include: /\.(js|css|html|svg|json)$/,
        threshold: 1024, // Only compress files > 1kb
        deleteOriginalAssets: false,
        algorithms: ['gzip', 'brotliCompress'],
      }),
      // Note: Prefetch hints are added by scripts/add-prefetch-hints.js post-build
    ].filter(Boolean),
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
    // Disable modulePreload for heavy chunks that aren't needed on initial load
    // This prevents large vendors from being preloaded on the initial page
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        // Only filter for the main entry point - allow lazy chunks to preload their deps
        if (!filename.includes('index')) return deps;

        // Filter out heavy chunks from initial modulepreload
        // These will load when actually needed (after App lazy loads)
        return deps.filter((dep) => {
          const isHeavyChunk =
            dep.includes('syncfusion-grid');
          return !isHeavyChunk;
        });
      },
    },
    // Enable terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunks for code splitting
        // Using object syntax for explicit vendor chunks, function for dynamic
        manualChunks: (id) => {
          // Shared utilities used across native components - prevent duplication
          if (id.includes('/utils/cn') || id.includes('/utils/is')) {
            return 'utils';
          }
          // React core - must load first
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // React Router - separate chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          // Zustand
          if (id.includes('zustand')) {
            return 'state';
          }
          // React Query
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          // i18n
          if (id.includes('i18next')) {
            return 'i18n';
          }
          // HTTP
          if (id.includes('axios')) {
            return 'http';
          }
          // Syncfusion Grid - very large
          if (id.includes('ej2-grids') || id.includes('ej2-react-grids')) {
            return 'syncfusion-grid';
          }
          // Syncfusion base
          if (id.includes('ej2-base')) {
            return 'syncfusion-base';
          }
          // Syncfusion inputs
          if (id.includes('ej2-inputs') || id.includes('ej2-buttons')) {
            return 'syncfusion-inputs';
          }
          // Syncfusion dropdowns
          if (id.includes('ej2-dropdowns')) {
            return 'syncfusion-dropdowns';
          }
          // Syncfusion navigation
          if (id.includes('ej2-navigations')) {
            return 'syncfusion-nav';
          }
          // Syncfusion popups
          if (id.includes('ej2-popups')) {
            return 'syncfusion-popups';
          }
          // Syncfusion calendars
          if (id.includes('ej2-calendars')) {
            return 'syncfusion-calendars';
          }
          return undefined;
        },
        // Use standard chunk file naming with [name] from manualChunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop() ?? '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (extType === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // CSS code splitting
    cssCodeSplit: true,
    // Chunk size warning
    chunkSizeWarningLimit: 500,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies - pre-bundle all heavy packages for faster dev server
  optimizeDeps: {
    include: [
      // React core
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',

      // React Router
      'react-router-dom',

      // State management
      'zustand',
      'zustand/middleware',

      // React Query
      '@tanstack/react-query',

      // i18n
      'i18next',
      'react-i18next',
      'i18next-browser-languagedetector',

      // HTTP client
      'axios',

      // Syncfusion base - shared across all components
      '@syncfusion/ej2-base',

      // Syncfusion React components
      '@syncfusion/ej2-react-buttons',
      '@syncfusion/ej2-react-inputs',
      '@syncfusion/ej2-react-dropdowns',
      '@syncfusion/ej2-react-grids',
      '@syncfusion/ej2-react-navigations',
      '@syncfusion/ej2-react-popups',
      '@syncfusion/ej2-react-calendars',
      '@syncfusion/ej2-react-layouts',

      // Syncfusion core packages (dependencies of React components)
      '@syncfusion/ej2-buttons',
      '@syncfusion/ej2-inputs',
      '@syncfusion/ej2-dropdowns',
      '@syncfusion/ej2-grids',
      '@syncfusion/ej2-navigations',
      '@syncfusion/ej2-popups',
      '@syncfusion/ej2-calendars',
      '@syncfusion/ej2-layouts',
      '@syncfusion/ej2-data',
      '@syncfusion/ej2-lists',
      '@syncfusion/ej2-splitbuttons',
    ],
    // Force optimization even if packages seem not to need it
    force: false,
    // Use esbuild options for faster transforms
    esbuildOptions: {
      target: 'es2020',
      // Preserve names for better debugging
      keepNames: true,
    },
  },
  preview: {
    port: 4445,
    proxy: {
      '/dummyjson': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (p: string) => p.replace(/^\/dummyjson/, ''),
      },
      '/mockapi': {
        target: 'http://localhost:5150',
        changeOrigin: true,
        rewrite: (p: string) => p.replace(/^\/mockapi/, ''),
      },
    },
  },
  server: {
    port: 4444,
    open: false,
    proxy: {
      '/dummyjson': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (p: string) => p.replace(/^\/dummyjson/, ''),
      },
      '/mockapi': {
        target: 'http://localhost:5150',
        changeOrigin: true,
        rewrite: (p: string) => p.replace(/^\/mockapi/, ''),
      },
    },
    // Warmup critical files for faster initial load
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/app/App.tsx',
        './src/app/router.tsx',
        './src/stores/useThemeStore.ts',
        './src/localization/i18n.ts',
        './src/components/common/LoadingSpinner.tsx',
        './src/features/auth/pages/LoginPage/index.tsx',
      ],
    },
    // Enable faster file system watching
    watch: {
      usePolling: false,
    },
  },
  // Performance hints and esbuild optimizations
  esbuild: {
    legalComments: 'none',
    // Keep names for better debugging in dev
    keepNames: true,
  },
};
});
