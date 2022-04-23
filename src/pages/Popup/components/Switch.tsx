import React from 'react'
import clsx from 'clsx'

type SwitchProps = Omit<JSX.IntrinsicElements['input'], 'onChange'> & {
  children: React.ReactNode,
  onChange (checked: boolean): void,
}

export default function Switch (
  { children, disabled, onChange, ...restProps }: SwitchProps
) {
  return (
    <label className={clsx('ts-switch', { 'is-disabled': disabled })}>
      <input
        type="checkbox"
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        {...restProps}
      />
      {children}
    </label>
  )
}
