import { useState, useEffect } from 'react'
import { loadIsAutoResetCodeEnabled, saveIsAutoResetCodeEnabled } from '../../../storage'

export function useEnableAutoResetCode () {
  const [isReady, setIsReady] = useState(false)
  const [isAutoResetCodeEnabled, setIsAutoResetCodeEnabled] = useState(false)

  useEffect(() => {
    if (!isReady) return
    saveIsAutoResetCodeEnabled(isAutoResetCodeEnabled)
  }, [isAutoResetCodeEnabled, isReady])

  async function load () {
    setIsAutoResetCodeEnabled(await loadIsAutoResetCodeEnabled())
    setIsReady(true)
  }

  useEffect(function init () {
    load()
  }, [])

  return {
    isAutoResetCodeEnabled,
    setIsAutoResetCodeEnabled,
  }
}
