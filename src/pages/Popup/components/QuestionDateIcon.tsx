import clsx from 'clsx'
import { ReactNode } from 'react'

interface QuestionStatusIconProps {
  children: ReactNode,
  isFinished: boolean,
}

export default function QuestionDateIcon ({ children, isFinished }: QuestionStatusIconProps) {
  return (
    <span
      className="ts-text is-bold"
      style={{ color: isFinished ? 'var(--ts-static-positive-500)' : '' }}
    >
      <span
        className={clsx(
          'ts-icon is-end-spaced',
          isFinished ? 'is-check-icon' : 'is-calendar-days-icon'
        )}
      />
      {children}
    </span>
  )
}
