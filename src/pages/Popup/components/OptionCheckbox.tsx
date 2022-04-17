import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'

const HiddenInput = styled.input({
  display: 'none',
})

type OptionCheckboxProps = Pick<JSX.IntrinsicElements['input'], 'checked' | 'disabled' | 'onChange'> & {
  title: string,
  icon: string,
}

export default function OptionCheckbox({ title, icon, disabled, checked, ...restProps }: OptionCheckboxProps) {
  return (
    <label className='ts-box'>
      <div
        className={clsx('ts-content is-interactive is-dense', {
          'is-active': checked,
          'is-disabled': disabled,
        })}
      >
        <div className="ts-iconset is-outlined">
          <span className={clsx('ts-icon', `is-${icon}-icon`)}></span>
          <div className="content">
            <div className="title">{title}</div>
            <div className="ts-text is-tiny">
              {checked ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>
      <HiddenInput
        type="checkbox"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
    </label>
  )
}
