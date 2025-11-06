// Content Script - 注入到网页中运行
console.log('Content script 已加载');

// 创建悬浮对话框
const tooltip = document.createElement('div');
tooltip.id = 'word-tooltip';
tooltip.style.cssText = `
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10000;
  display: none;
  min-width: 200px;
  min-height: 100px;
`;
document.body.appendChild(tooltip);

// 匹配英文单词的正则表达式
const wordRegex = /^[a-zA-Z]+$/;
let hoverTimer = null;

// 监听文本选中事件
document.addEventListener('mouseup', (e) => {
  // 如果点击的是面板内部，不处理
  if (tooltip.contains(e.target)) {
    return;
  }
  
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  // 如果有选中的文本
  if (selectedText) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // 在选中文本附近显示对话框，显示选中的内容
    tooltip.textContent = selectedText;
    tooltip.style.display = 'block';
    tooltip.style.left = rect.left + window.scrollX + 'px';
    tooltip.style.top = rect.bottom + window.scrollY + 5 + 'px';
  } else {
    // 没有选中文本时隐藏对话框
    tooltip.style.display = 'none';
  }
});

// 监听鼠标移动事件 - 悬停1秒后显示
document.addEventListener('mousemove', (e) => {
  // 清除之前的计时器
  if (hoverTimer) {
    clearTimeout(hoverTimer);
  }
  
  // 设置新的计时器
  hoverTimer = setTimeout(() => {
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) return;
    
    const textNode = range.startContainer;
    if (textNode.nodeType !== Node.TEXT_NODE) return;
    
    const text = textNode.textContent;
    const offset = range.startOffset;
    
    // 找到单词的起始和结束位置
    let start = offset;
    let end = offset;
    
    // 向前查找单词开始
    while (start > 0 && wordRegex.test(text[start - 1])) {
      start--;
    }
    
    // 向后查找单词结束
    while (end < text.length && wordRegex.test(text[end])) {
      end++;
    }
    
    const word = text.substring(start, end);
    
    // 如果是有效的英文单词，显示对话框
    if (word && wordRegex.test(word)) {
      tooltip.textContent = word;
      tooltip.style.display = 'block';
      tooltip.style.left = e.pageX + 10 + 'px';
      tooltip.style.top = e.pageY + 10 + 'px';
    }
  }, 1000); // 1秒后触发
});

// 点击页面其他地方时隐藏对话框
document.addEventListener('mousedown', (e) => {
  if (e.target !== tooltip && !tooltip.contains(e.target)) {
    tooltip.style.display = 'none';
  }
});

// 监听来自popup或background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script 收到消息:', request);
  
  if (request.action === 'buttonClicked') {
    console.log('按钮被点击了！');
    document.body.style.border = '5px solid red';
    sendResponse({ status: 'success', message: '操作完成' });
  }
  
  return true;
});
