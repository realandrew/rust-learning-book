import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '$lib': new URL('./src/lib', import.meta.url).pathname
    }
  }
})