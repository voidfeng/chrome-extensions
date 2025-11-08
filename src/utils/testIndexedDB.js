// 测试 IndexedDB 功能
export const testIndexedDB = async () => {
  console.log('=== 开始测试 IndexedDB ===')
  
  // 测试1: 检查 IndexedDB 是否可用
  if (!window.indexedDB) {
    console.error('✗ IndexedDB 不可用')
    return false
  }
  console.log('✓ IndexedDB 可用')
  
  // 测试2: 尝试打开数据库
  try {
    const request = indexedDB.open('TestDB', 1)
    
    await new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log('✓ 可以打开数据库')
        request.result.close()
        resolve()
      }
      request.onerror = () => {
        console.error('✗ 无法打开数据库:', request.error)
        reject(request.error)
      }
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        db.createObjectStore('test', { keyPath: 'id' })
      }
    })
    
    // 清理测试数据库
    indexedDB.deleteDatabase('TestDB')
    
  } catch (error) {
    console.error('✗ 数据库测试失败:', error)
    return false
  }
  
  console.log('=== IndexedDB 测试通过 ===')
  return true
}

// 列出所有数据库
export const listDatabases = async () => {
  if (indexedDB.databases) {
    const dbs = await indexedDB.databases()
    console.log('现有数据库:', dbs)
    return dbs
  } else {
    console.log('浏览器不支持 indexedDB.databases()')
    return []
  }
}
