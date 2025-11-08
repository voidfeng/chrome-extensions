@echo off
chcp 65001 >nul
echo.
echo 🚀 启动本地服务器...
echo.
echo 请选择启动方式：
echo 1. Python 3 (推荐)
echo 2. Python 2
echo 3. Node.js (需要安装 http-server)
echo 4. PHP
echo.
set /p choice="请输入选项 (1-4): "

if "%choice%"=="1" (
    echo 使用 Python 3 启动服务器...
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo 使用 Python 2 启动服务器...
    python -m SimpleHTTPServer 8000
) else if "%choice%"=="3" (
    echo 使用 Node.js 启动服务器...
    npx http-server -p 8000
) else if "%choice%"=="4" (
    echo 使用 PHP 启动服务器...
    php -S localhost:8000
) else (
    echo 无效选项
    pause
    exit /b 1
)

echo.
echo ✅ 服务器已启动！
echo 📱 请在浏览器中打开: http://localhost:8000
echo 按 Ctrl+C 停止服务器
pause
