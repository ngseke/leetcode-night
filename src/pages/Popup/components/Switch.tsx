import React from 'react'
import clsx from 'clsx'

type SwitchProps = Omit<JSX.IntrinsicElements['input'], 'onChange'> & {
  children: React.ReactNode,
  onChange (checked: boolean): void,
  icon?: string,
}

export function Switch (
  { children, disabled, onChange, icon, ...restProps }: SwitchProps
) {
  return (
    <label className={clsx('ts-switch', { 'is-disabled': disabled })}>
      <input
        type="checkbox"
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        {...restProps}
      />
      {
        icon &&
          <span className={`ts-icon is-secondary is-end-spaced is-${icon}-icon`} />
      }
      {children}
    </label>
  )
}
