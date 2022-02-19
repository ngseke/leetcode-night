import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { OPTIONS } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'

const List = styled.ul({
  padding: 0,
  listStyle: 'none'
})

const Item = styled.li(({ disabled }) => (
  {
    marginBottom: 8,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    opacity: disabled ? .5 : 1
  }
))

const Checkbox = styled.input({
  marginRight: 8,
})

const options = [
  OPTIONS.INVERT_IMAGE_COLOR
]

export default function Options({ disabled }) {
  const [form, setForm] = useState(null)

  const handleChange = (key) =>
    (e) => {
      setForm((form) => ({
        ...form,
        [key]: e.target.checked
      }))
    }

  useEffect(() => {
    loadOptions().then(setForm)
  }, [])

  useEffect(() => {
    saveOptions(form)
  }, [form])

  return (
    <List>
      {
        options?.map(({ name, key }) => (
          <Item key={key} disabled={disabled}>
            <label>
              <Checkbox
                type="checkbox"
                checked={form?.[key] ?? false}
                onChange={handleChange(key)}
                disabled={disabled}
              />
              {name}
            </label>
          </Item>
        ))
      }
    </List>
  )
}
