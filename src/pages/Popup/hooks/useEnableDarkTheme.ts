import { useState, useEffect } from 'react'
import { loadIsEnabled, saveIsEnabled } from '../../../storage'

export default function useEnableDarkTheme () {
  const [isReady, setIsReady] = useState(false)
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false)

  useEffect(() => {
    if (!isReady) return
    saveIsEnabled(isDarkThemeEnabled)
  }, [isDarkThemeEnabled, isReady])

  async function load () {
    setIsDarkThemeEnabled(await loadIsEnabled())
    setIsReady(true)
  }

  useEffect(function init () {
    load()
    const handler = () => load()
    chrome.storage.onChanged.addListener(handler)
    return () => chrome.storage.onChanged.removeListener(handler)
  }, [])

  return {
    isDarkThemeEnabled,
    setIsDarkThemeEnabled,
  }
}
