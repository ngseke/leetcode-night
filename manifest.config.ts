import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

const key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsPcJJyNn/5+SF3R/k2Tns8YYq+tMEBfezf6mjNGfTdV2ukGopBpQRvwrNgoLX6Oaug8r7zpNyeAvDXtKBUC9qr4kxEwNiMU2tuIsV0PZg1H8FzKnQL6msP8yVlZJhKl9Olv3tK7MTTByaR7upP8iQZNBjPest4zRGxkJfOfJRSJpPuwWi1XC2tLeSo6lNz19l5kxfJBxtTHS9Y9P48o2A+9OMZtR64sR2eYxE/E6NHC/vQ4507Ao6x0dhO4eKl9KyV1u8b5ZQjavfVz2zYeF/yQw6VdzysR3W5Yd3BOTDvaDqMdSW+CtrZwTF4lNC+zJzvSIfKMQ4Ow/+Thg2XUe8wIDAQAB'

export default defineManifest(async () => ({
  manifest_version: 3,
  version,
  key,

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
