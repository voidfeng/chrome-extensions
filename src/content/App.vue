<template>
  <Tooltip
    :visible="tooltipVisible"
    :word="selectedWord"
    :position="tooltipPosition"
    @close="hideTooltip"
    @translate="handleTranslate"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import Tooltip from './Tooltip.vue'

const tooltipVisible = ref(false)
const selectedWord = ref('')
const tooltipPosition = ref({ x: 0, y: 0 })

const showTooltip = (word, x, y) => {
  selectedWord.value = word
  tooltipPosition.value = { x, y }
  tooltipVisible.value = true
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

const handleTranslate = (word) => {
  console.log('翻译功能:', word)
  // 这里可以调用翻译 API
}

const handleSearch = (word) => {
  console.log('搜索功能:', word)
  // 这里可以打开搜索页面
  window.open(`https://www.google.com/search?q=${encodeURIComponent(word)}`, '_blank')
}

// 暴露方法给外部调用
defineExpose({
  showTooltip,
  hideTooltip
})
</script>
