import { useState, useEffect } from 'react'
import { loadLeetcodeVersion } from '../../../storage'
import { Nullish } from '../types/Nullish'
import { LeetcodeVersion } from '../../Content/leetcode-version'

export function useLeetCodeVersion () {
  const [leetcodeVersion, setLeetcodeVersion] = useState<Nullish<LeetcodeVersion>>(null)

  async function load () {
    setLeetcodeVersion(await loadLeetcodeVersion())
  }

  useEffect(function init () {
    load()
    const handler = () => load()
    chrome.storage.onChanged.addListener(handler)
    return () => chrome.storage.onChanged.removeListener(handler)
  }, [])

  return {
    leetcodeVersion,
  }
}
