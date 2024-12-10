import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bibliotheque-cabri/',
  plugins: [vue(),
    
  ],
    build: {
      outDir: '../bibliotheque-cabri-copie copie/cabricloud-lti1p3/public/bibliotheque-cabri'
      //outDir: '../cabricloud-lti1p3/public/bibliotheque-cabri'
      //outDir: '../bibliotheque-cabri-lti1p3/public'
    },
})