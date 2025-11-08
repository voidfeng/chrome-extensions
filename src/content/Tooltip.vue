<template>
  <div
    v-if="visible"
    class="word-tooltip"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <div class="tooltip-header">
      <h3>{{ word }}</h3>
      <button @click="close" class="close-btn">×</button>
    </div>
    <div class="tooltip-content">
      {{ translation }}
      <div v-if="loading" class="loading">查询中...</div>
      <div v-else-if="translation" class="translation" v-html="translation"></div>
      <div v-else class="no-result">暂无释义</div>
      
      <div class="actions">
        <button @click="translate">重新查询</button>
        <button @click="search">搜索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  word: String,
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  translation: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'translate', 'search'])

const close = () => {
  emit('close')
}

const translate = () => {
  emit('translate', props.word)
  console.log('翻译:', props.word)
}

const search = () => {
  emit('search', props.word)
  console.log('搜索:', props.word)
}
</script>

<style scoped>
.word-tooltip {
  position: absolute;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  min-width: 250px;
  max-width: 400px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.tooltip-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.tooltip-content {
  padding: 16px;
}

.tooltip-content p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.translation {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.no-result {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.actions button {
  flex: 1;
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.actions button:hover {
  background: #1557b0;
}
</style>
