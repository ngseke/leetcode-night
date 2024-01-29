import { useState, useEffect } from 'react'
import { loadIsInsertDislikeCountEnabled, saveIsInsertDislikeCountEnabled } from '../../../storage'

export function useEnableInsertDislikeCount () {
  const [isReady, setIsReady] = useState(false)
  const [isInsertDislikeCountEnabled, setIsInsertDislikeCountEnabled] = useState(false)

  useEffect(() => {
    if (!isReady) return
    saveIsInsertDislikeCountEnabled(isInsertDislikeCountEnabled)
  }, [isInsertDislikeCountEnabled, isReady])

  async function load () {
    setIsInsertDislikeCountEnabled(await loadIsInsertDislikeCountEnabled())
    setIsReady(true)
  }

  useEffect(function init () {
    load()
  }, [])

  return {
    isInsertDislikeCountEnabled,
    setIsInsertDislikeCountEnabled,
  }
}
