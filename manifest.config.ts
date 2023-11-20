import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

export default defineManifest(async () => ({
  manifest_version: 3,
  version,

  default_locale: 'en',
  name: '__MSG_appName__',
  description: '__MSG_appDesc__',

  icons: {
    128: 'src/assets/img/icon-128.png',
  },
  action: {
    default_popup: 'src/pages/Popup/popup.html',
    default_icon: 'src/assets/img/icon-128.png',
  },
  content_scripts: [
    {
      matches: ['https://leetcode.com/problems/*'],
      js: ['src/pages/Content/index.ts'],
      run_at: 'document_start',
    },
  ],
  permissions: ['storage'],
}))
