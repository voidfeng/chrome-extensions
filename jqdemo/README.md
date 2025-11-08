# MDX 字典翻译工具

这是一个基于浏览器的 MDX 字典查询工具，支持上传和解析 MDX 格式的字典文件。

## 功能特点

- ✅ 支持上传 MDX 字典文件
- ✅ 支持拖拽上传
- ✅ 实时查询单词
- ✅ **随机显示10个词条**（导入后自动显示）
- ✅ 点击词条即可查看释义
- ✅ 一键刷新随机词条
- ✅ 美观的界面展示
- ✅ 支持多种 MDX 格式
- ✅ 纯前端实现，无需服务器

## 使用方法

### 1. 启动本地服务器

由于使用了 ES Module，需要通过本地服务器访问：

**方式一：使用启动脚本（推荐）**

Mac/Linux:
```bash
cd jqdemo
./start-server.sh
```

Windows:
```bash
cd jqdemo
start-server.bat
```

**方式二：手动启动**

Python 3:
```bash
cd jqdemo
python3 -m http.server 8000
```

Node.js:
```bash
cd jqdemo
npx http-server -p 8000
```

然后在浏览器中打开: `http://localhost:8000`

### 2. 上传字典

- 点击"选择 MDX 文件"按钮，选择你的 `.mdx` 字典文件
- 或者直接将 `.mdx` 文件拖拽到上传区域

### 3. 浏览随机词条

- 上传成功后，页面会自动显示10个随机词条
- 点击任意词条可查看其释义
- 点击"🔄 换一批"按钮可刷新随机词条

### 4. 查询单词

- 在输入框中输入要查询的单词
- 按回车键或点击"查询"按钮
- 查看查询结果
- 点击"← 返回词条列表"可返回随机词条页面

## 文件说明

- `index.html` - 主页面文件
- `fy.js` - jQuery 和 UI 交互逻辑
- `p.css` - 样式文件
- `TLD.mdx` - 示例字典文件（可选）

## 依赖库

- **jQuery 3.2.1** - UI 交互
- **Pako** - zlib 解压（CDN）
- **js-mdict** - MDX 解析库（本地打包版本，位于 `../js-mdcit-dist/`）

## 技术栈

- HTML5 File API
- JavaScript ES6+
- jQuery 3.2.1
- Pako (zlib 解压库)
- js-mdict (第三方 MDX 解析库)

## 支持的 MDX 格式

目前支持基础的 MDX 2.0 格式，包括：

- 未加密的 MDX 文件
- UTF-8 / UTF-16LE 编码
- HTML 格式的词条内容
- 压缩和未压缩的数据块

## 注意事项

1. **必须使用本地服务器**：由于 CORS 限制，不能直接双击打开 HTML 文件
2. **本地库**：使用本地打包的 js-mdict 库，无需网络连接（除了 pako 库）
3. **ES Module**：需要支持 ES Module 的现代浏览器
4. **文件大小限制**：由于是纯前端解析，建议使用小于 100MB 的字典文件
5. **浏览器兼容性**：需要现代浏览器支持（Chrome 61+, Firefox 60+, Safari 11+, Edge 16+）
6. **加密字典**：支持部分加密的 MDX 文件
7. **性能**：首次加载大型字典可能需要几秒钟时间

## 常见问题

### Q: 页面打不开或显示 CORS 错误？
A: 必须使用本地服务器打开，不能直接双击 HTML 文件。请运行 `start-server.sh` 或 `start-server.bat`。

### Q: 上传后显示"加载失败"？
A: 请确保文件是有效的 MDX 格式，且未加密。

### Q: 查询不到单词？
A: 检查单词拼写，或尝试使用小写字母查询。

### Q: 支持哪些字典？
A: 理论上支持所有标准 MDX 2.0 格式的字典，如朗文、牛津等。

## 开发说明

### 使用的 js-mdict 库

本项目使用本地打包的 [js-mdict](https://github.com/terasum/js-mdict) 库，这是一个成熟的开源项目，支持：
- MDX 2.0 格式
- 多种压缩算法（zlib, lzo）
- 加密字典（部分支持）
- 高性能解析
- 模糊搜索和前缀搜索

**API 功能：**
- `lookup(word)` - 精确查询单词
- `prefix(prefix)` - 前缀搜索
- `fuzzy_search(word, size, distance)` - 模糊搜索
- `associate(phrase)` - 关联词搜索

### 自定义样式

编辑 `p.css` 或在 `index.html` 的 `<style>` 标签中添加样式。

### 添加新功能

在 `index.html` 的 `<script>` 标签中添加 JavaScript 代码。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0 (2024-11-08)
- 初始版本
- 支持 MDX 文件上传和解析
- 实现基础查询功能
- 美化界面
