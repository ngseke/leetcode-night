import React, { useEffect, useState } from 'react'
import { OPTIONS } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'
import OptionCheckbox from './OptionCheckbox'

const options = [
  OPTIONS.INVERT_IMAGE_COLOR,
  OPTIONS.MASCOT,
  OPTIONS.HIDE_LOGO,
]

export default function Options({ disabled }) {
  const [form, setForm] = useState(null)

  const handleChange = (key) => (e) => {
    setForm((form) => ({
      ...form,
      [key]: e.target.checked,
    }))
  }

  useEffect(() => {
    loadOptions().then(setForm)
  }, [])

  useEffect(() => {
    saveOptions(form)
  }, [form])

  return (
    <div className='ts-wrap is-vertical is-compact'>
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
