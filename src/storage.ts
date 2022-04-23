import { DEFAULT_OPTIONS, OptionsForm } from './options'
import {
  AUTO_RESET_CODE_ENABLED_STORAGE_KEY,
  ENABLED_STORAGE_KEY,
  OPTIONS_STORAGE_KEY,
} from './constants'

export const loadIsEnabled = (): Promise<boolean> => {
  const key = ENABLED_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const isEnabled = Boolean(items[key] ?? true)
      resolve(isEnabled)
    })
  })
}

export const saveIsEnabled = (isEnabled: boolean) => {
  chrome.storage.sync.set({ [ENABLED_STORAGE_KEY]: isEnabled })
}

export const loadOptions = (): Promise<OptionsForm> => {
  const key = OPTIONS_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const options = items[key] ?? DEFAULT_OPTIONS
      resolve(options)
    })
  })
}

export const saveOptions = (options: OptionsForm) => {
  chrome.storage.sync.set({ [OPTIONS_STORAGE_KEY]: options })
}

export const loadIsAutoResetCodeEnabled = (): Promise<boolean> => {
  const key = AUTO_RESET_CODE_ENABLED_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const isEnabled = Boolean(items[key] ?? false)
      resolve(isEnabled)
    })
  })
}

export const saveIsAutoResetCodeEnabled = (isEnabled: boolean) => {
  chrome.storage.sync.set({ [AUTO_RESET_CODE_ENABLED_STORAGE_KEY]: isEnabled })
}
