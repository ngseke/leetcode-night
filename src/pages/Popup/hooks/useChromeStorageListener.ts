import { useEffect } from 'react'
import { type StorageKey } from '../../../storage'

export type UseChromeStorageListenerHandler = Parameters<typeof chrome.storage.onChanged.addListener>[0]

export function useChromeStorageListener (
  handler: UseChromeStorageListenerHandler,
  key?: StorageKey
) {
  useEffect(() => {
    const changeHandler: UseChromeStorageListenerHandler = (changes, ...rest) => {
      if (!key || key in changes) {
        handler(changes, ...rest)
      }
    }

    chrome.storage.onChanged.addListener(changeHandler)
    return () => {
      chrome.storage.onChanged.removeListener(changeHandler)
    }
  }, [handler, key])
}
