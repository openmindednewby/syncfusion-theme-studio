import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { analyzer } from 'vite-bundle-analyzer';
import { compression } from 'vite-plugin-compression2';

// Note: Google Fonts are stripped post-build by scripts/strip-google-fonts.js

export default defineConfig(({ mode }: ConfigEnv) => ({
  plugins: [
    react(),
    mode === 'analyze' && analyzer(),
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
    // This prevents Syncfusion Grid from being preloaded on the login page
    modulePreload: {
      resolveDependencies: (_filename, deps) => {
        // Filter out syncfusion-grid from initial modulepreload
        return deps.filter((dep) => !dep.includes('syncfusion-grid'));
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
        // Improved manual chunks for better code splitting
        manualChunks: (id: string) => {
          // React core - loads first, cache for long time
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('node_modules/react/')) return 'react-core';

          // React Router - needed for navigation
          if (id.includes('react-router')) return 'react-router';

          // State management - small, loads with app
          if (id.includes('zustand')) return 'state';
          if (id.includes('@tanstack/react-query')) return 'query';

          // i18n - internationalization
          if (id.includes('i18next')) return 'i18n';

          // Syncfusion base - shared across all components
          if (id.includes('@syncfusion/ej2-base')) return 'syncfusion-base';

          // Syncfusion Grid - large, load on demand
          if (id.includes('@syncfusion/ej2-react-grids') || id.includes('@syncfusion/ej2-grids'))
            return 'syncfusion-grid';

          // Syncfusion Inputs - buttons, inputs, dropdowns
          if (
            id.includes('@syncfusion/ej2-react-inputs') ||
            id.includes('@syncfusion/ej2-inputs') ||
            id.includes('@syncfusion/ej2-react-buttons') ||
            id.includes('@syncfusion/ej2-buttons')
          )
            return 'syncfusion-inputs';

          // Syncfusion Dropdowns
          if (id.includes('@syncfusion/ej2-react-dropdowns') || id.includes('@syncfusion/ej2-dropdowns'))
            return 'syncfusion-dropdowns';

          // Syncfusion Navigation - sidebar, tabs, etc.
          if (id.includes('@syncfusion/ej2-react-navigations') || id.includes('@syncfusion/ej2-navigations'))
            return 'syncfusion-nav';

          // Syncfusion Popups - dialogs, tooltips
          if (id.includes('@syncfusion/ej2-react-popups') || id.includes('@syncfusion/ej2-popups'))
            return 'syncfusion-popups';

          // Syncfusion Calendars - date pickers
          if (id.includes('@syncfusion/ej2-react-calendars') || id.includes('@syncfusion/ej2-calendars'))
            return 'syncfusion-calendars';

          // Axios - HTTP client
          if (id.includes('axios')) return 'http';

          // Other vendor libraries
          if (id.includes('node_modules')) return 'vendor';

          return undefined;
        },
        // Optimize chunk file names for caching
        chunkFileNames: () => {
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
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
  server: {
    port: 4445,
    open: true,
    // Warmup critical files for faster initial load
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/app/App.tsx',
        './src/app/routes.tsx',
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
}));
