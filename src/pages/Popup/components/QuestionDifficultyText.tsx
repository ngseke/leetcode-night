import { useMemo } from 'react'
import { colors } from '../modules/themes'
import { Difficulty } from '../types/Question'

interface QuestionDifficultyTextProps {
  level: Difficulty['level'],
}

export default function QuestionDifficultyText ({ level }: QuestionDifficultyTextProps) {
  const { color, name } = useMemo(() => {
    return {
      1: { name: 'Easy', color: colors.green },
      2: { name: 'Medium', color: colors.yellow },
      3: { name: 'Hard', color: colors.red },
    }[level]
  }, [level])

  return (
    <span style={{ color }}>
      {name}
    </span>
  )
}
