#!/bin/bash

# MDX 字典查询工具 - 本地服务器启动脚本

echo "🚀 启动本地服务器..."
echo ""
echo "请选择启动方式："
echo "1. Python 3 (推荐)"
echo "2. Python 2"
echo "3. Node.js (需要安装 http-server)"
echo "4. PHP"
echo ""
read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo "使用 Python 3 启动服务器..."
        python3 -m http.server 8000
        ;;
    2)
        echo "使用 Python 2 启动服务器..."
        python -m SimpleHTTPServer 8000
        ;;
    3)
        echo "使用 Node.js 启动服务器..."
        npx http-server -p 8000
        ;;
    4)
        echo "使用 PHP 启动服务器..."
        php -S localhost:8000
        ;;
    *)
        echo "无效选项"
        exit 1
        ;;
esac

echo ""
echo "✅ 服务器已启动！"
echo "📱 请在浏览器中打开: http://localhost:8000"
echo "按 Ctrl+C 停止服务器"
