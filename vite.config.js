import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Site utilisateur GitHub Pages (gossotjeanbaptiste.github.io) -> base '/'
export default defineConfig({
  base: '/',
  plugins: [tailwindcss()],
});
