// 临时方案：使用在线翻译 API 或模拟数据
// 真正的 MDX 解析需要专门的浏览器兼容库

let dictionaryData = null

// 初始化 MDX 字典
export const initMdict = async (arrayBuffer) => {
  try {
    console.log('[MDX] 开始初始化，ArrayBuffer 大小:', arrayBuffer.byteLength, 'bytes')
    
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('ArrayBuffer 为空')
    }
    
    // 保存 ArrayBuffer 引用
    dictionaryData = arrayBuffer
    
    console.log('[MDX] ✓ 字典数据已缓存（暂未解析）')
    console.log('[MDX] 注意：完整的 MDX 解析需要专门的浏览器兼容库')
    
    return true
  } catch (error) {
    console.error('[MDX] ✗ 字典初始化失败:', error)
    dictionaryData = null
    return false
  }
}

// 查询单词（临时使用在线 API）
export const lookupWord = async (word) => {
  if (!dictionaryData) {
    console.warn('字典未初始化')
    return null
  }

  try {
    console.log('[MDX] 查询单词:', word)
    
    // 临时方案：使用免费的翻译 API
    // 这里可以替换为真正的 MDX 解析
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
    
    if (response.ok) {
      const data = await response.json()
      if (data && data.length > 0) {
        const entry = data[0]
        let html = `<div style="font-family: sans-serif; padding: 10px;">
          <h3 style="margin: 0 0 10px 0;">${entry.word}</h3>`
        
        if (entry.phonetic) {
          html += `<p style="color: #666; margin: 5px 0;"><i>${entry.phonetic}</i></p>`
        }
        
        if (entry.meanings && entry.meanings.length > 0) {
          entry.meanings.forEach(meaning => {
            html += `<p style="margin: 10px 0;"><strong>${meaning.partOfSpeech}</strong></p><ul style="margin: 5px 0; padding-left: 20px;">`
            meaning.definitions.slice(0, 3).forEach(def => {
              html += `<li style="margin: 5px 0;">${def.definition}</li>`
            })
            html += `</ul>`
          })
        }
        
        html += `<p style="color: #999; font-size: 12px; margin-top: 10px;">来源: Free Dictionary API</p></div>`
        
        return html
      }
    }
    
    return null
  } catch (error) {
    console.error('[MDX] 查询失败:', error)
    return null
  }
}

// 检查字典是否已初始化
export const isMdictReady = () => {
  return dictionaryData !== null
}

// 重置字典
export const resetMdict = () => {
  dictionaryData = null
}
