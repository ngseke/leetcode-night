import clsx from 'clsx'
import { useMemo } from 'react'
import { colors } from '../modules/themes'
import { Question } from '../types/Question'

interface QuestionStatusIconProps {
  status: Question['status'],
}

export default function QuestionStatusIcon ({ status }: QuestionStatusIconProps) {
  const { name, icon, color } = useMemo(() => {
    if (!status) return { name: 'Todo', icon: 'minus', color: colors.gray }

    return {
      ac: { name: 'Solved', icon: 'check', color: colors.green },
      notac: { name: 'Attempted', icon: 'wave-square', color: colors.yellow },
    }[status]
  }, [status])

  return (
    <span>
      <span
        style={{ color }}
        className={clsx('ts-icon is-end-spaced', `is-${icon}-icon`)}
      />
      {name}
    </span>
  )
}
