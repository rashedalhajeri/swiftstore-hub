
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: 'react',  // Use this instead of jsxRuntime
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,  // This will inject React import into every file
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'], // Pre-bundle common dependencies
  },
  build: {
    sourcemap: mode !== 'production', // Only include sourcemaps in development
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@/components/ui/button',
            '@/components/ui/input',
            '@/components/ui/card',
            '@/components/ui/dialog',
            '@/components/ui/tabs',
          ],
        },
      },
    },
  }
}));
