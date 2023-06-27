import { useCallback, useEffect, useState } from 'react'
import Nullish from '../types/Nullish'

export default function useSelectedIndex (length?: Nullish<number>) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const resetSelectedIndex = useCallback(() => {
    setSelectedIndex(length ? 0 : -1)
  }, [length])

  const increaseSelectedIndex = useCallback(() => {
    if (!length) return resetSelectedIndex()
    setSelectedIndex(index => (index + 1 + length) % length)
  }, [length, resetSelectedIndex])

  const decreaseSelectedIndex = useCallback(() => {
    if (!length) return resetSelectedIndex()
    setSelectedIndex(index => (index >= 1) ? index - 1 : length - 1)
  }, [length, resetSelectedIndex])

  useEffect(() => resetSelectedIndex(), [length, resetSelectedIndex])

  return {
    selectedIndex,
    resetSelectedIndex,
    increaseSelectedIndex,
    decreaseSelectedIndex,
  }
}
