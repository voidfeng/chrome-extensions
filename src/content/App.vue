<template>
  <Tooltip
    :visible="tooltipVisible"
    :word="selectedWord"
    :position="tooltipPosition"
    :translation="translation"
    :loading="translating"
    @close="hideTooltip"
    @translate="handleTranslate"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Tooltip from './Tooltip.vue'

const tooltipVisible = ref(false)
const selectedWord = ref('')
const tooltipPosition = ref({ x: 0, y: 0 })
const dictionaryReady = ref(false)
const translation = ref('')
const translating = ref(false)

const showTooltip = (word, x, y) => {
  selectedWord.value = word
  tooltipPosition.value = { x, y }
  tooltipVisible.value = true
  translation.value = ''
  
  // 自动查询翻译
  handleTranslate(word)
}

const hideTooltip = () => {
  tooltipVisible.value = false
  translation.value = ''
}

const handleTranslate = async (word) => {
  if (!dictionaryReady.value) {
    translation.value = '字典未加载'
    return
  }

  translating.value = true
  try {
    // 通过消息向 background 查询
    const response = await chrome.runtime.sendMessage({
      action: 'lookupWord',
      word: word
    })
    
    if (response.success) {
      translation.value = response.definition
      console.log('[Content] 查询成功:', word)
    } else {
      translation.value = response.error || '未找到该单词'
      console.log('[Content] 查询失败:', response.error)
    }
  } catch (error) {
    console.error('[Content] 查询失败:', error)
    translation.value = '查询失败'
  } finally {
    translating.value = false
  }
}

const handleSearch = (word) => {
  console.log('搜索功能:', word)
  window.open(`https://www.google.com/search?q=${encodeURIComponent(word)}`, '_blank')
}

// 检查字典状态
onMounted(async () => {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'checkDictionary'
    })
    dictionaryReady.value = response.ready
    console.log('[Content] 字典状态:', response.ready ? '已加载' : '未加载')
  } catch (error) {
    console.error('[Content] 检查字典状态失败:', error)
  }
})

// 暴露方法给外部调用
defineExpose({
  showTooltip,
  hideTooltip
})
</script>
