import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Importation des plugins
  plugins: [react(), tailwindcss()],

  // Définition d'un chemin par défaut
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
