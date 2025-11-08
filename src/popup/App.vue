<template>
  <div class="container">
    <h1>扩展设置</h1>
    
    <div class="setting-item">
      <label>导入字典</label>
      
      <div v-if="!importedFile" class="upload-area">
        <input 
          type="file" 
          accept=".mdx"
          @change="handleFileImport"
          ref="fileInput"
          :disabled="importing"
        />
        <p v-if="importing" class="status-text importing">导入中...</p>
      </div>
      
      <div v-else class="imported-area">
        <div class="file-status">
          <span class="status-icon">✓</span>
          <span class="file-name">{{ importedFile }}</span>
        </div>
        <button @click="handleDelete" class="delete-btn">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { saveDictionary, getDictionary, deleteDictionary } from '@/utils/dictionaryDB'

const fileInput = ref(null)
const importedFile = ref('')
const importing = ref(false)

const handleFileImport = async (event) => {
  const file = event.target.files[0]
  console.log('选择的文件:', file)
  
  if (!file) {
    console.log('未选择文件')
    return
  }
  
  if (!file.name.endsWith('.mdx')) {
    alert('请选择 .mdx 格式的字典文件')
    return
  }
  
  importing.value = true
  try {
    console.log('开始导入字典文件:', file.name, '大小:', (file.size / 1024 / 1024).toFixed(2), 'MB')
    await saveDictionary(file)
    importedFile.value = file.name
    console.log('✓ 字典文件已成功保存到 IndexedDB')
    
    // 通知 background 重新加载字典
    console.log('通知 background 重新加载字典...')
    const response = await chrome.runtime.sendMessage({
      action: 'reloadDictionary'
    })
    
    if (response.success) {
      console.log('✓ Background 字典加载成功')
      alert('字典导入成功！')
    } else {
      console.log('✗ Background 字典加载失败')
      alert('字典已保存，但加载失败，请刷新页面重试')
    }
  } catch (error) {
    console.error('✗ 保存字典失败:', error)
    alert('字典导入失败: ' + error.message)
  } finally {
    importing.value = false
  }
}

const handleDelete = async () => {
  if (confirm('确定要删除字典吗？')) {
    try {
      await deleteDictionary()
      importedFile.value = ''
      if (fileInput.value) {
        fileInput.value.value = ''
      }
      console.log('字典已删除')
    } catch (error) {
      console.error('删除字典失败:', error)
    }
  }
}

onMounted(async () => {
  console.log('=== Popup 已加载 ===')
  
  // 测试 IndexedDB
  if (!window.indexedDB) {
    console.error('✗ IndexedDB 不可用！')
    alert('浏览器不支持 IndexedDB')
    return
  }
  console.log('✓ IndexedDB 可用')
  
  try {
    const dict = await getDictionary()
    if (dict) {
      importedFile.value = dict.fileName
      console.log('✓ 找到已保存的字典:', dict.fileName)
    } else {
      console.log('未找到已保存的字典')
    }
  } catch (error) {
    console.error('✗ 读取字典失败:', error)
  }
})
</script>

<style scoped>
.container {
  min-height: 160px;
}

.setting-item {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

input[type="file"] {
  font-size: 13px;
  color: #666;
}

.upload-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status-text {
  font-size: 12px;
  margin: 0;
}

.status-text.importing {
  color: #f4b400;
}

.imported-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f7ff;
  border-radius: 4px;
}

.file-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-icon {
  color: #4285f4;
  font-size: 16px;
  font-weight: bold;
}

.file-name {
  font-size: 13px;
  color: #333;
}

.delete-btn {
  padding: 4px 12px;
  font-size: 12px;
  color: #d93025;
  background-color: transparent;
  border: 1px solid #d93025;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: #d93025;
  color: white;
}
</style>
