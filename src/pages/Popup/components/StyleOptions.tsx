import { useTranslation } from 'react-i18next'
import { type OptionKey, OPTIONS } from '../../../options'
import { OPTIONS_STORAGE_KEY } from '../../../storage'
import { useEnableDarkTheme } from '../hooks/useEnableDarkTheme'
import { Switch } from './Switch'
import { useLeetCodeVersion } from '../hooks/useLeetCodeVersion'
import { LeetcodeVersionDescription } from './LeetcodeVersionDescription'
import { LeetcodeVersionBadge } from './LeetcodeVersionBadge'
import { useChromeStorage } from '../hooks/useChromeStorage'

const options = [
  OPTIONS.MASCOT,
  OPTIONS.INVERT_IMAGE_COLOR,
  OPTIONS.HIDE_LOGO,
]

export function StyleOptions () {
  const { t } = useTranslation()
  const [leetcodeVersion] = useLeetCodeVersion()

  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useEnableDarkTheme()
  const [storageOptions, setStorageOptions] =
    useChromeStorage(OPTIONS_STORAGE_KEY)

  const handleChange = (key: OptionKey) =>
    (checked: boolean) => {
      if (!storageOptions) return
      setStorageOptions({ ...storageOptions, [key]: checked })
    }

  const isHidden = (key: OptionKey) => {
    if (key === 'mascot') return leetcodeVersion !== '2022'
    return false
  }

  return (
    <div className="ts-wrap is-vertical is-start-aligned">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
        <Switch
          checked={isDarkThemeEnabled}
          onChange={setIsDarkThemeEnabled}
          icon="moon"
        >
          {t('option.enableDarkTheme')}
          <LeetcodeVersionBadge version={leetcodeVersion} />
        </Switch>
        <LeetcodeVersionDescription version={leetcodeVersion} />
      </div>

      {options?.map(({ key, icon }) => (
        !isHidden(key) && (
          <Switch
            key={key}
            checked={storageOptions?.[key]}
            onChange={handleChange(key)}
            icon={icon}
          >
            {t(`option.${key}`)}
          </Switch>
        )
      ))}
    </div>
  )
}
