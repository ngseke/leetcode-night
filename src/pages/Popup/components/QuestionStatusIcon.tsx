import clsx from 'clsx'
import { useMemo } from 'react'
import Question from '../types/Question'

interface QuestionStatusIconProps {
  status: Question['status'],
}

export default function QuestionStatusIcon ({ status }: QuestionStatusIconProps) {
  const { name, icon, color } = useMemo(() => {
    if (!status) return { name: 'Todo', icon: 'minus', color: '#5C5C5C' }

    return {
      ac: { name: 'Solved', icon: 'check', color: '#51B5A3' },
      notac: { name: 'Attempted', icon: 'wave-square', color: '#F6C149' },
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
