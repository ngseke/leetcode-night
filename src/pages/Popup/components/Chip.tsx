import { type FC } from 'react'

export const Chip: FC = ({ children }) => {
  return (
    <div className="ts-chip is-small is-end-spaced ts-text is-bold is-outlined">
      {children}
    </div>
  )
}
