import React from 'react'
import clsx from 'clsx'

type SwitchProps = JSX.IntrinsicElements['input'] & {
  children: React.ReactNode,
}

export default function Switch({ children, disabled, ...restProps }: SwitchProps) {
  return (<>
    <label className={clsx('ts-switch ts-header', { 'is-disabled': disabled })}>
      <input type="checkbox" disabled={disabled} {...restProps} />
      {children}
    </label>
    <div className="ts-space" />
  </>)
}
