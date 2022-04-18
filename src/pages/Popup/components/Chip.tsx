import { FC } from 'react'

const Chip: FC = ({ children }) => {
  return (
    <div className="ts-chip is-outlined is-small is-end-spaced">
      {children}
    </div>
  )
}

export default Chip
