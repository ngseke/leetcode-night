import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OptionKey, OPTIONS, OptionsForm } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'
import { useEnableDarkTheme } from '../hooks/useEnableDarkTheme'
import { Switch } from './Switch'

const options = [
  OPTIONS.INVERT_IMAGE_COLOR,
  OPTIONS.MASCOT,
  OPTIONS.HIDE_LOGO,
]

export function StyleOptions () {
  const { t } = useTranslation()

  const [form, setForm] = useState<OptionsForm>()

  const handleChange = (key: OptionKey) =>
    (checked: boolean) => {
      setForm((form) => {
        if (!form) return form
        return { ...form, [key]: checked }
      })
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
      <div>
        <Switch
          checked={isDarkThemeEnabled}
          onChange={setIsDarkThemeEnabled}
          icon="moon"
        >
          {t('option.enableDarkTheme')}
        </Switch>
        <div className="ts-text is-description">
          {t('option.enableDarkTheme2023Description')}
        </div>
      </div>

      {options?.map(({ key, icon }) => (
        <Switch
          key={key}
          checked={form?.[key] ?? false}
          onChange={handleChange(key)}
          icon={icon}
        >
          {t(`option.${key}`)}
        </Switch>
      ))}
    </div>
  )
}
