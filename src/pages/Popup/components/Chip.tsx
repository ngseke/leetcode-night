import { type PropsWithChildren } from 'react'

export function Chip ({ children }: PropsWithChildren<Record<never, never>>) {
  return (
    <div className="ts-chip is-small is-end-spaced ts-text is-bold is-outlined">
      {children}
    </div>
  )
}
