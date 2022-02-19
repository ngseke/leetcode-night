import { DEFAULT_OPTIONS } from './options'

const { ENABLED_STORAGE_KEY, OPTIONS_STORAGE_KEY } = require('./constants')

export const loadIsEnabled = () => {
  const key = ENABLED_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const isEnabled = items[key] ?? true
      resolve(isEnabled)
    })
  })
}

export const saveIsEnabled = (isEnabled) => {
  chrome.storage.sync.set({ [ENABLED_STORAGE_KEY]: isEnabled })
}

export const loadOptions = () => {
  const key = OPTIONS_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const options = items[key] ?? DEFAULT_OPTIONS
      resolve(options)
    })
  })
}

export const saveOptions = (options) => {
  chrome.storage.sync.set({ [OPTIONS_STORAGE_KEY]: options })
}
