import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server :{
    proxy :{
      '/api':{
        target :'http://localhost:3000',
        secure :false,
      },

    }
  },
   // ✅ ADD THIS
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true,
  },
  plugins: [
    tailwindcss(),
  ],
})