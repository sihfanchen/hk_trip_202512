import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  base: '/hk_trip_202512/', // 重要：這裡要跟你的 GitHub Repo 名稱一樣
})