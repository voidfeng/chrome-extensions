import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' with { type: 'json' }

export default defineManifest({
  manifest_version: 3,
  name: '我的Chrome扩展',
  version: pkg.version,
  description: '一个使用Manifest V3的Chrome扩展',
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background.js',
    type: 'module',
  },
  content_scripts: [{
    js: ['src/content.js'],
    matches: ['<all_urls>'],
  }],
  permissions: [
    'storage',
    'activeTab',
  ],
})
