import clsx from 'clsx'
import { ReactNode } from 'react'
import { colors } from '../modules/themes'

interface QuestionStatusIconProps {
  children: ReactNode,
  isFinished: boolean,
}

export default function QuestionDateIcon ({ children, isFinished }: QuestionStatusIconProps) {
  return (
    <span>
      <span
        style={{ color: isFinished ? colors.green : '' }}
        className={clsx(
          'ts-icon is-end-spaced',
          isFinished ? 'is-calendar-check-icon' : 'is-calendar-days-icon'
        )}
      />
      {children}
    </span>
  )
}
