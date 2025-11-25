import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // <--- 絕對不能少這一行，否則 Tailwind 完全不會運作

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
*修改後，請重新執行 `npm run deploy`。*

### 2. 檢查 `vite.config.ts` 的路徑設定 (如果是線上版才有問題)
如果你的網頁在「本地」(`npm run dev`) 看起來很漂亮，但傳到 GitHub Pages 就變醜了，那是因為路徑設定錯了。

請確認你的 **GitHub Repository 名稱** 與 `vite.config.ts` 裡的 `base` 設定是否**完全一致** (包含大小寫)。

例如：
* 你的 GitHub 網址是：`https://username.github.io/My-HK-Trip/`
* 你的 `vite.config.ts` 必須是：
    ```typescript
    export default defineConfig({
      plugins: [react()],
      base: '/My-HK-Trip/', // 前後都要有斜線，且名稱要跟網址上的一模一樣
    })