import { DEFAULT_OPTIONS, OptionsForm } from './options'
import {
  AUTO_RESET_CODE_ENABLED_STORAGE_KEY,
  ENABLED_STORAGE_KEY,
  OPTIONS_STORAGE_KEY,
  INSERT_YOUTUBE_LINK_STORAGE_KEY,
} from './constants'

async function getStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.sync.get(key))[key] ?? defaultValue
}

async function setStorage <T> (key: string, value: T) {
  return chrome.storage.sync.set({ [key]: value })
}

export const loadIsEnabled = () => {
  return getStorage(ENABLED_STORAGE_KEY, true)
}

export const saveIsEnabled = (isEnabled: boolean) => {
  return setStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export const loadOptions = () => {
  return getStorage(OPTIONS_STORAGE_KEY, DEFAULT_OPTIONS)
}

export const saveOptions = (options: OptionsForm) => {
  return setStorage(OPTIONS_STORAGE_KEY, options)
}

export const loadIsAutoResetCodeEnabled = () => {
  return getStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY, false)
}

export const saveIsAutoResetCodeEnabled = (isEnabled: boolean) => {
  return setStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY, isEnabled)
}

export const loadIsInsertYoutubeLinkEnabled = () => {
  return getStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY, true)
}

export const saveIsInsertYoutubeLinkEnabled = (isEnabled: boolean) => {
  return setStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY, isEnabled)
}
