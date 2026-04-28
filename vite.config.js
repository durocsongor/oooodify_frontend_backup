import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/user': {
        target: 'https://nodejs307.dszcbaross.edu.hu',
        changeOirigin: true
      },
      '/admin': {
        target: 'https://nodejs307.dszcbaross.edu.hu',
        changeOirigin: true
      },
      '/song': {
        target: 'https://nodejs307.dszcbaross.edu.hu',
        changeOirigin: true
      },
      '/uploads': {
        target: 'https://nodejs307.dszcbaross.edu.hu',
        changeOirigin: true
      },
    }
  }
})
