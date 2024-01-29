import { DEFAULT_OPTIONS, type OptionsForm } from './options'
import { type LeetcodeVersion } from './pages/Content/leetcode-version'
import { type Nullish } from './pages/Popup/types/Nullish'

const ENABLED_STORAGE_KEY = 'enabled'
const LEETCODE_VERSION_STORAGE_KEY = 'leetcodeVersion'
const OPTIONS_STORAGE_KEY = 'options'
const AUTO_RESET_CODE_ENABLED_STORAGE_KEY = 'autoResetCodeEnabled'
const INSERT_YOUTUBE_LINK_STORAGE_KEY = 'insertYoutubeLinkEnabled'
const INSERT_DISLIKE_COUNT_STORAGE_KEY = 'insertDislikeCountEnabled'

export interface StorageSchema {
  [ENABLED_STORAGE_KEY]: boolean,
  [LEETCODE_VERSION_STORAGE_KEY]: Nullish<LeetcodeVersion>,
  [OPTIONS_STORAGE_KEY]: OptionsForm,
  [AUTO_RESET_CODE_ENABLED_STORAGE_KEY]: boolean,
  [INSERT_YOUTUBE_LINK_STORAGE_KEY]: boolean,
  [INSERT_DISLIKE_COUNT_STORAGE_KEY]: boolean,
}

export const storageDefaultValues: StorageSchema = {
  [ENABLED_STORAGE_KEY]: true,
  [LEETCODE_VERSION_STORAGE_KEY]: null,
  [OPTIONS_STORAGE_KEY]: DEFAULT_OPTIONS,
  [AUTO_RESET_CODE_ENABLED_STORAGE_KEY]: false,
  [INSERT_YOUTUBE_LINK_STORAGE_KEY]: true,
  [INSERT_DISLIKE_COUNT_STORAGE_KEY]: true,
}

export type StorageKey = keyof StorageSchema

const localStorageKeys = new Set<StorageKey>([
  LEETCODE_VERSION_STORAGE_KEY,
])

export async function getStorage <
  Key extends StorageKey
> (key: Key): Promise<StorageSchema[Key]> {
  const value = localStorageKeys.has(key)
    ? (await chrome.storage.local.get(key))[key]
    : (await chrome.storage.sync.get(key))[key]

  return value ?? structuredClone(storageDefaultValues[key])
}

export async function setStorage<
  Key extends StorageKey
> (key: Key, value: StorageSchema[Key]) {
  if (localStorageKeys.has(key)) {
    await chrome.storage.local.set({ [key]: value })
  } else {
    await chrome.storage.sync.set({ [key]: value })
  }
}

export const loadIsEnabled = () => {
  return getStorage(ENABLED_STORAGE_KEY)
}

export const saveIsEnabled = (isEnabled: boolean) => {
  return setStorage(ENABLED_STORAGE_KEY, isEnabled)
}

export const loadLeetcodeVersion = () => {
  return getStorage(LEETCODE_VERSION_STORAGE_KEY)
}

export const saveLeetcodeVersion = (version: LeetcodeVersion) => {
  return setStorage(LEETCODE_VERSION_STORAGE_KEY, version)
}

export const loadOptions = () => {
  return getStorage(OPTIONS_STORAGE_KEY)
}

export const saveOptions = (options: OptionsForm) => {
  return setStorage(OPTIONS_STORAGE_KEY, options)
}

export const loadIsAutoResetCodeEnabled = () => {
  return getStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY)
}

export const saveIsAutoResetCodeEnabled = (isEnabled: boolean) => {
  return setStorage(AUTO_RESET_CODE_ENABLED_STORAGE_KEY, isEnabled)
}

export const loadIsInsertYoutubeLinkEnabled = () => {
  return getStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY)
}

export const saveIsInsertYoutubeLinkEnabled = (isEnabled: boolean) => {
  return setStorage(INSERT_YOUTUBE_LINK_STORAGE_KEY, isEnabled)
}

export const loadIsInsertDislikeCountEnabled = () => {
  return getStorage(INSERT_DISLIKE_COUNT_STORAGE_KEY)
}

export const saveIsInsertDislikeCountEnabled = (isEnabled: boolean) => {
  return setStorage(INSERT_DISLIKE_COUNT_STORAGE_KEY, isEnabled)
}
