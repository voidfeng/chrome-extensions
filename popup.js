// 弹窗脚本
document.addEventListener('DOMContentLoaded', () => {
  const actionBtn = document.getElementById('actionBtn');
  
  actionBtn.addEventListener('click', async () => {
    // 获取当前活动标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // 向content script发送消息
    chrome.tabs.sendMessage(tab.id, { action: 'buttonClicked' }, (response) => {
      console.log('收到响应:', response);
    });
    
    // 保存数据到storage
    chrome.storage.local.set({ lastClick: new Date().toISOString() }, () => {
      console.log('数据已保存');
    });
  });
  
  // 读取之前保存的数据
  chrome.storage.local.get(['lastClick'], (result) => {
    if (result.lastClick) {
      console.log('上次点击时间:', result.lastClick);
    }
  });
});
