import { DEFAULT_OPTIONS, Options } from './options'
import { ENABLED_STORAGE_KEY, OPTIONS_STORAGE_KEY } from './constants'

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

export const loadOptions = (): Promise<Options> => {
  const key = OPTIONS_STORAGE_KEY
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (items) => {
      const options = items[key] ?? DEFAULT_OPTIONS
      resolve(options)
    })
  })
}

export const saveOptions = (options: Options) => {
  chrome.storage.sync.set({ [OPTIONS_STORAGE_KEY]: options })
}
