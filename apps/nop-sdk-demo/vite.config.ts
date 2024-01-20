import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],


  resolve: {
    alias:{
   //   "react-json-view": "./nop-sdk/fix-react-json-view.js"
    }
  },

  server: {
    proxy: {
      '/r': {
        target: 'http://localhost:8080/r', // The target URL of the proxy
        rewrite: (path) => path.replace(/^\/r/, ''), // Rewrite the path if needed
      },
      '/graphql': {
        target: 'http://localhost:8080/graphql', // The target URL of the proxy
        rewrite: (path) => path.replace(/^\/graphql/, ''), // Rewrite the path if needed
      },
      '/q': {
        target: 'http://localhost:8080/q', // The target URL of the proxy
        rewrite: (path) => path.replace(/^\/q/, ''), // Rewrite the path if needed
      },
      '/p': {
        target: 'http://localhost:8080/p', // The target URL of the proxy
        rewrite: (path) => path.replace(/^\/p/, ''), // Rewrite the path if needed
      },
      '/f': {
        target: 'http://localhost:8080/f', // The target URL of the proxy
        rewrite: (path) => path.replace(/^\/f/, ''), // Rewrite the path if needed
      },
    }
  },
})
