import { useState, useEffect } from 'react'
import { type StorageKey, type StorageSchema, setStorage, getStorage } from '../../../storage'
import { isEqual } from 'lodash-es'
import { useChromeStorageListener } from './useChromeStorageListener'

export function useChromeStorage <Key extends StorageKey> (key: Key) {
  type Value = StorageSchema[Key]

  const [value, setValue] = useState<Value | null>(null)

  async function saveValue (newValue: Value) {
    if (value == null || newValue == null) return
    if (isEqual(value, newValue)) return

    setValue(newValue)
    await setStorage(key, newValue)
  }

  useEffect(function init () {
    async function load () {
      setValue(await getStorage(key))
    }
    load()
  }, [key])

  useChromeStorageListener((changes) => {
    if (!(key in changes)) return
    const { newValue, oldValue } = changes[key]
    if (isEqual(newValue, oldValue)) return

    setValue(newValue)
  })

  return [value, saveValue] as const
}
