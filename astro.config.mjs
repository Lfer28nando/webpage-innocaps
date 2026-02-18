// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate Three.js ecosystem into its own chunk (loaded on demand)
            'three-vendor': ['three'],
            'r3f': ['@react-three/fiber'],
            'r3f-drei': ['@react-three/drei'],
            // Framer-motion in its own chunk
            'framer': ['framer-motion'],
            // React core
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    server: {
      allowedHosts: ['.ngrok-free.dev', '.ngrok.io']
    }
  }
});