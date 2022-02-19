import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { OPTIONS } from '../../../options'
import { loadOptions, saveOptions } from '../../../storage'

const List = styled.ul({
  padding: 0,
  listStyle: 'none'
})

const Item = styled.li({
  marginBottom: 8,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none'
})

const Checkbox = styled.input({
  marginRight: 8,
})

const options = [
  OPTIONS.INVERT_IMAGE_COLOR
]

export default function Options({ value, onChange }) {
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
          <Item key={key}>
            <label>
              <Checkbox
                type="checkbox"
                checked={form?.[key] ?? false}
                onChange={handleChange(key)}
              />
              {name}
            </label>
          </Item>
        ))
      }
    </List>
  )
}
