import clsx from 'clsx'
import { type Nullish } from '../types/Nullish'
import { type PropsWithChildren } from 'react'

type SwitchProps = PropsWithChildren<{
  checked: Nullish<boolean>,
  onChange: (checked: boolean) => void,
  icon?: string,
  disabled?: boolean,
}>

export function Switch (
  { children, disabled, checked, onChange, icon }: SwitchProps
) {
  return (
    <label className={clsx('ts-switch', { 'is-disabled': disabled })}>
      {
        checked != null &&
          <input
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={e => onChange(e.target.checked)}
          />
      }
      {
        icon &&
          <span className={`ts-icon is-secondary is-end-spaced is-${icon}-icon`} />
      }
      {children}
    </label>
  )
}
