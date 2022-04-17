import { useMemo } from 'react'
import { Difficulty } from '../types/Question'

interface QuestionDifficultyTextProps {
  level: Difficulty['level'],
}

export default function QuestionDifficultyText ({ level }: QuestionDifficultyTextProps) {
  const { color, name } = useMemo(() => {
    return {
      1: { name: 'Easy', color: '#51B5A3' },
      2: { name: 'Medium', color: '#F6C149' },
      3: { name: 'Hard', color: '#EB4B63' },
    }[level]
  }, [level])

  return (
    <span style={{ color }}>
      {name}
    </span>
  )
}
