import { useState, useEffect } from 'react'
import { loadIsEnabled, saveIsEnabled } from '../../../storage'

export default function useEnableDarkTheme () {
  const [isReady, setIsReady] = useState(false)
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false)

  useEffect(() => {
    if (!isReady) return
    saveIsEnabled(isDarkThemeEnabled)
  }, [isDarkThemeEnabled, isReady])

  useEffect(function init () {
    loadIsEnabled().then(isEnabled => {
      setIsDarkThemeEnabled(isEnabled)
      setIsReady(true)
    })
  }, [])

  return {
    isDarkThemeEnabled,
    setIsDarkThemeEnabled,
  }
}
