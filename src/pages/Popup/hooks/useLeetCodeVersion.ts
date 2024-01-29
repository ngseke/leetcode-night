import { LEETCODE_VERSION_STORAGE_KEY } from '../../../storage'
import { useChromeStorage } from './useChromeStorage'

export function useLeetCodeVersion () {
  const [version] = useChromeStorage(LEETCODE_VERSION_STORAGE_KEY)
  return [version]
}
