import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue(),
    
  ],
    build: {
      outDir: '../cabricloud-lti1p3/public/bibliotheque-cabri'
      //outDir: '../bibliotheque-cabri-lti1p3/public'
    },
})