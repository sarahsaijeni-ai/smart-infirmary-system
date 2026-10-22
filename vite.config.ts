import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  // Support the owner's Netlify variable names while retaining existing names.
  // Only use a Supabase publishable/anon key in browser code; never a service-role key.
  envPrefix: ['VITE_', 'SUPABASE_', 'NEXT_PUBLIC_'],
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
