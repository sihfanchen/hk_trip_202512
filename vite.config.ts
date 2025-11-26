import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hk_trip_202512/', // 記得確認這裡跟你的 GitHub Repo 名稱一樣
  css: {
    postcss: {
      plugins: [
        // 直接在這裡告訴 Tailwind 要掃描哪些檔案 (content)
        tailwindcss({
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }),
        autoprefixer,
      ],
    },
  },
})