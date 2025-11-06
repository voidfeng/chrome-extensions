# Chrome 扩展项目

这是一个使用 Manifest V3 的 Chrome 扩展项目。

## 项目结构

```
.
├── manifest.json       # 扩展配置文件 (Manifest V3)
├── popup.html         # 弹窗页面
├── popup.css          # 弹窗样式
├── popup.js           # 弹窗脚本
├── background.js      # 后台服务工作线程
├── content.js         # 内容脚本（注入到网页）
└── icons/             # 图标文件夹（需要添加图标）
```

## 安装步骤

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本项目文件夹

## 功能说明

- **Popup**: 点击扩展图标显示弹窗界面
- **Background Service Worker**: 后台运行的服务工作线程
- **Content Script**: 注入到网页中的脚本，可以操作DOM
- **Storage API**: 使用 chrome.storage 保存数据
- **消息传递**: popup、background 和 content script 之间的通信

## 注意事项

- 需要在 `icons/` 文件夹中添加 16x16、48x48 和 128x128 的图标文件
- 或者暂时从 manifest.json 中删除 icons 相关配置

## Manifest V3 特性

- 使用 Service Worker 替代 background pages
- 使用 `action` 替代 `browser_action` 和 `page_action`
- 更严格的内容安全策略
- 改进的权限系统
