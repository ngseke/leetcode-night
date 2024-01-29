import { ENABLED_STORAGE_KEY } from '../../../storage'
import { useChromeStorage } from './useChromeStorage'

export function useEnableDarkTheme () {
  return useChromeStorage(ENABLED_STORAGE_KEY)
}
