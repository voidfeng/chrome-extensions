// IndexedDB 操作封装
const DB_NAME = 'DictionaryDB'
const DB_VERSION = 1
const STORE_NAME = 'dictionaries'

// 打开数据库
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

// 保存字典文件
export const saveDictionary = async (file) => {
  console.log('开始保存字典:', file.name, '大小:', file.size, 'bytes')
  
  const db = await openDB()
  console.log('数据库已打开')
  
  const arrayBuffer = await file.arrayBuffer()
  console.log('文件已读取为 ArrayBuffer, 大小:', arrayBuffer.byteLength, 'bytes')
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    const data = {
      id: 'main',
      fileName: file.name,
      content: arrayBuffer,
      timestamp: Date.now()
    }
    
    console.log('准备保存数据到 IndexedDB')
    const request = store.put(data)
    
    request.onsuccess = () => {
      console.log('字典保存成功到 IndexedDB')
      resolve(data)
    }
    
    request.onerror = () => {
      console.error('保存失败:', request.error)
      reject(request.error)
    }
    
    transaction.oncomplete = () => {
      console.log('事务完成')
      db.close()
    }
    
    transaction.onerror = () => {
      console.error('事务错误:', transaction.error)
    }
  })
}

// 获取字典文件
export const getDictionary = async () => {
  console.log('开始从 IndexedDB 读取字典')
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get('main')
    
    request.onsuccess = () => {
      const result = request.result
      if (result) {
        console.log('字典读取成功:', result.fileName, '大小:', result.content?.byteLength, 'bytes')
      } else {
        console.log('未找到字典数据')
      }
      db.close()
      resolve(result)
    }
    
    request.onerror = () => {
      console.error('读取失败:', request.error)
      reject(request.error)
    }
  })
}

// 删除字典文件
export const deleteDictionary = async () => {
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete('main')
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
