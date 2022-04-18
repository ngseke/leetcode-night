import clsx from 'clsx'
import { ReactNode } from 'react'

interface QuestionStatusIconProps {
  children: ReactNode,
  isFinished: boolean,
}

export default function QuestionDateIcon ({ children, isFinished }: QuestionStatusIconProps) {
  return (
    <span>
      <span
        style={{ color: '#51B5A3' }}
        className={clsx(
          'ts-icon is-end-spaced',
          isFinished ? 'is-calendar-check-icon' : 'is-calendar-days-icon'
        )}
      />
      {children}
    </span>
  )
}
