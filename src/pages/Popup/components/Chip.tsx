import { FC } from 'react'

const Chip: FC = ({ children }) => {
  return (
    <div className="ts-chip is-small is-end-spaced ts-text is-bold">
      {children}
    </div>
  )
}

export default Chip
