# Vue 3 Content Script

这个目录包含使用 Vue 3 构建的 content script 悬浮对话框。

## 文件结构

- `main.js` - Content script 入口，负责事件监听和 Vue 应用初始化
- `App.vue` - 根组件，管理状态和事件处理
- `Tooltip.vue` - 悬浮对话框组件，可自定义样式和功能

## 快速开发

### 修改样式
直接编辑 `Tooltip.vue` 中的 `<style>` 部分

### 添加新功能
在 `Tooltip.vue` 中添加新的按钮和方法：

```vue
<button @click="yourFunction">新功能</button>
```

然后在 `App.vue` 中处理事件：

```javascript
const handleYourFunction = (word) => {
  // 你的逻辑
}
```

### 调用 API
可以在事件处理函数中使用 `fetch` 或 `chrome.runtime.sendMessage` 与 background script 通信

## 运行

```bash
npm run dev
```

然后在 Chrome 中加载 `dist` 目录作为未打包的扩展。
