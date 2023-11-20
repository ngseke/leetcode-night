import { DEFAULT_OPTIONS, type OptionsForm } from './options'
import {
  AUTO_RESET_CODE_ENABLED_STORAGE_KEY,
  ENABLED_STORAGE_KEY,
  OPTIONS_STORAGE_KEY,
  INSERT_YOUTUBE_LINK_STORAGE_KEY,
  LEETCODE_VERSION_STORAGE_KEY,
} from './constants'
import { type LeetcodeVersion } from './pages/Content/leetcode-version'
import { type Nullish } from './pages/Popup/types/Nullish'

async function getSyncStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.sync.get(key))[key] ?? defaultValue
}

async function setSyncStorage <T> (key: string, value: T) {
  return await chrome.storage.sync.set({ [key]: value })
}

async function getLocalStorage <T> (key: string, defaultValue: T): Promise<T> {
  return (await chrome.storage.local.get(key))[key] ?? defaultValue
}

async function setLocalStorage <T> (key: string, value: T) {
  return await chrome.storage.local.set({ [key]: value })
}

export const loadIsEnabled = () => {
  return getSyncStorage(ENABLED_STORAGE_KEY, true)
}

export const saveIsEnabled = (isEnabled: boolean) => {
  return setSyncStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export const loadLeetcodeVersion = () => {
  return getLocalStorage<Nullish<LeetcodeVersion>>(LEETCODE_VERSION_STORAGE_KEY, null)
}

export const saveLeetcodeVersion = (version: LeetcodeVersion) => {
  return setLocalStorage(LEETCODE_VERSION_STORAGE_KEY, version)
}

export const loadOptions = () => {
  return getSyncStorage(OPTIONS_STORAGE_KEY, DEFAULT_OPTIONS)
}

export const saveOptions = (options: OptionsForm) => {
  return setSyncStorage(OPTIONS_STORAGE_KEY, options)
}

export const loadIsAutoResetCodeEnabled = () => {
  return getSyncStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY, false)
}

export const saveIsAutoResetCodeEnabled = (isEnabled: boolean) => {
  return setSyncStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY, isEnabled)
}

export const loadIsInsertYoutubeLinkEnabled = () => {
  return getSyncStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY, true)
}

export const saveIsInsertYoutubeLinkEnabled = (isEnabled: boolean) => {
  return setSyncStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY, isEnabled)
}
