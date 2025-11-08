// Service Worker (后台脚本)
console.log('Background service worker 已启动');

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener((details) => {
  console.log('扩展已安装:', details.reason);
  
  if (details.reason === 'install') {
    // 首次安装时的逻辑
    console.log('这是首次安装');
  } else if (details.reason === 'update') {
    // 更新时的逻辑
    console.log('扩展已更新');
  }
});

// 监听来自content script或popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request);
  
  if (request.action === 'getData') {
    // 处理消息并返回响应
    sendResponse({ data: '这是来自background的数据' });
  }
  
  return true; // 保持消息通道开放以支持异步响应
});
