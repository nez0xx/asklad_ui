import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@http': '/src/http',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@store': '/src/store',
      '@UI': '/src/UI',
      '@utils': '/src/utils',
      '@context': '/src/context',
    }
  }
  // server: {
  //   https: {
  //     key: readFileSync('C:\\Windows\\System32\\localhost-key.pem'),
  //     cart: readFileSync('C:\\Windows\\System32\\localhost.pem')
  //   }
  // }
})
