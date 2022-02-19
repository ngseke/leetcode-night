const { ENABLED_STORAGE_KEY } = require('./constants')

export const getIsEnabled = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([ENABLED_STORAGE_KEY], (items) => {
      const isEnabled = items[ENABLED_STORAGE_KEY] ?? true
      resolve(isEnabled)
    })
  })
}
