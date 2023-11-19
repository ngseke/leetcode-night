import { useState, useEffect } from 'react'
import { loadIsInsertYoutubeLinkEnabled, saveIsInsertYoutubeLinkEnabled } from '../../../storage'

export function useEnableInsertYoutubeLink () {
  const [isReady, setIsReady] = useState(false)
  const [isInsertYoutubeLinkEnabled, setIsInsertYoutubeLinkEnabled] = useState(false)

  useEffect(() => {
    if (!isReady) return
    saveIsInsertYoutubeLinkEnabled(isInsertYoutubeLinkEnabled)
  }, [isInsertYoutubeLinkEnabled, isReady])

  async function load () {
    setIsInsertYoutubeLinkEnabled(await loadIsInsertYoutubeLinkEnabled())
    setIsReady(true)
  }

  useEffect(function init () {
    load()
  }, [])

  return {
    isInsertYoutubeLinkEnabled,
    setIsInsertYoutubeLinkEnabled,
  }
}
