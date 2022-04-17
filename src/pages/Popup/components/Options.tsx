import { useEffect, useState } from 'react'
import { OptionKey, OPTIONS, OptionsForm } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'
import OptionCheckbox from './OptionCheckbox'

const options = [
  OPTIONS.INVERT_IMAGE_COLOR,
  OPTIONS.MASCOT,
  OPTIONS.HIDE_LOGO,
]

interface OptionsProps {
  disabled: boolean,
}

export default function Options ({ disabled }: OptionsProps) {
  const [form, setForm] = useState<OptionsForm>()

  const handleChange = (key: OptionKey) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((form) => {
        if (!form) return form
        return { ...form, [key]: e.target.checked }
      })
    }

  useEffect(() => {
    loadOptions().then(setForm)
  }, [])

  useEffect(() => {
    if (form) saveOptions(form)
  }, [form])

  return (
    <div className="ts-wrap is-vertical is-compact">
      {options?.map(({ name, icon, key }) => (
        <OptionCheckbox
          key={key}
          icon={icon}
          title={name}
          checked={form?.[key] ?? false}
          onChange={handleChange(key)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
