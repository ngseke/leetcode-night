import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type OptionKey, OPTIONS, type OptionsForm } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'
import { useEnableDarkTheme } from '../hooks/useEnableDarkTheme'
import { Switch } from './Switch'
import { useLeetCodeVersion } from '../hooks/useLeetCodeVersion'
import { LeetcodeVersionDescription } from './LeetcodeVersionDescription'
import { LeetcodeVersionBadge } from './LeetcodeVersionBadge'

const options = [
  OPTIONS.MASCOT,
  OPTIONS.INVERT_IMAGE_COLOR,
  OPTIONS.HIDE_LOGO,
]

export function StyleOptions () {
  const { t } = useTranslation()
  const { leetcodeVersion } = useLeetCodeVersion()

  const [form, setForm] = useState<OptionsForm>()

  const handleChange = (key: OptionKey) =>
    (checked: boolean) => {
      setForm((form) => {
        if (!form) return form
        return { ...form, [key]: checked }
      })
    }

  const isHidden = (key: OptionKey) => {
    if (key === 'mascot') return leetcodeVersion !== '2022'
    return false
  }

  useEffect(() => {
    loadOptions().then(setForm)
  }, [])

  useEffect(() => {
    if (form) saveOptions(form)
  }, [form])

  const { isDarkThemeEnabled, setIsDarkThemeEnabled } = useEnableDarkTheme()

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
            checked={form?.[key] ?? false}
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
