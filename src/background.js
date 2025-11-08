// Service Worker (后台脚本)
import { getDictionary } from './utils/dictionaryDB.js'
import { initMdict, lookupWord } from './utils/mdxParser.js'

console.log('Background service worker 已启动')

let dictionaryReady = false

// 初始化字典
const initDictionary = async () => {
  try {
    console.log('[Background] 开始加载字典...')
    const dict = await getDictionary()
    if (dict && dict.content) {
      console.log('[Background] 字典文件:', dict.fileName, '大小:', (dict.content.byteLength / 1024 / 1024).toFixed(2), 'MB')
      const success = await initMdict(dict.content)
      if (success) {
        dictionaryReady = true
        console.log('[Background] ✓ 字典初始化完成')
        return true
      }
    } else {
      console.log('[Background] 未找到字典文件')
    }
  } catch (error) {
    console.error('[Background] 字典加载失败:', error)
  }
  return false
}

// 启动时加载字典
initDictionary()

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener((details) => {
  console.log('扩展已安装:', details.reason)
  
  if (details.reason === 'install') {
    console.log('这是首次安装')
  } else if (details.reason === 'update') {
    console.log('扩展已更新')
    // 更新后重新加载字典
    initDictionary()
  }
})

// 监听来自content script或popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[Background] 收到消息:', request)
  
  // 查询单词
  if (request.action === 'lookupWord') {
    if (!dictionaryReady) {
      sendResponse({ success: false, error: '字典未加载' })
      return true
    }
    
    try {
      const result = lookupWord(request.word)
      if (result) {
        sendResponse({ success: true, definition: result })
      } else {
        sendResponse({ success: false, error: '未找到该单词' })
      }
    } catch (error) {
      console.error('[Background] 查询失败:', error)
      sendResponse({ success: false, error: '查询失败' })
    }
    return true
  }
  
  // 重新加载字典
  if (request.action === 'reloadDictionary') {
    initDictionary().then(success => {
      sendResponse({ success })
    })
    return true
  }
  
  // 检查字典状态
  if (request.action === 'checkDictionary') {
    sendResponse({ ready: dictionaryReady })
    return true
  }
  
  return true
})
