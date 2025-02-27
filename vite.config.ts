import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      include: [/\.tsx?$/, /\.jsx?$/, /\.css$/],
    }),
  ],
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://between.io',
        rewrite: (path) => path.replace('/api', '/api'),
        changeOrigin: true,
        ws: true,
        configure: (proxy) =>
          proxy.on('proxyReq', (proxy) =>
            console.log(`-> ${proxy.protocol}//${proxy.host}${proxy.path}`),
          ),
      },
    },
  },
})
