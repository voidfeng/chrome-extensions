# Chrome 扩展 - Vite 开发版

使用 Vite 7 + CRXJS 2.2 构建的现代化 Chrome 扩展项目。

## 项目结构

```
src/
├── popup/           # 弹窗页面
│   ├── index.html
│   ├── main.js
│   └── style.css
├── background.js    # 后台服务
└── content.js       # 内容脚本
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（支持热重载）
npm run dev

# 构建生产版本
npm run build
```

## 加载扩展

1. 运行 `npm run dev` 或 `npm run build`
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist` 目录

## 特性

- ✅ 热重载：修改代码后自动刷新扩展
- ✅ 现代化打包：使用 Vite 7 的快速构建
- ✅ 模块化：支持 ES modules
- ✅ 自动打包：构建后自动生成 zip 文件到 `release` 目录
- ✅ TypeScript 支持：已包含 @types/chrome

## 配置文件

- `manifest.config.js` - 扩展清单配置
- `vite.config.js` - Vite 构建配置
- `package.json` - 项目依赖和脚本

## 技术栈

- Vite 7.2.2
- @crxjs/vite-plugin 2.2.1
- Chrome Extension Manifest V3
