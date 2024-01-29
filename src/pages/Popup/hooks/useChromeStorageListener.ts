import { useEffect } from 'react'
import { type StorageKey } from '../../../storage'

type Handler = Parameters<typeof chrome.storage.onChanged.addListener>[0]

export function useChromeStorageListener (
  handler: Handler,
  key?: StorageKey
) {
  useEffect(() => {
    const changeHandler: Handler = (changes, ...rest) => {
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
