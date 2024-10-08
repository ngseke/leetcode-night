import { colors } from '../modules/themes'
import { type Difficulty } from '../types/Question'

interface QuestionDifficultyTextProps {
  level: Difficulty['level'],
}

export function QuestionDifficultyText ({ level }: QuestionDifficultyTextProps) {
  const { color, name } = {
    1: { name: 'Easy', color: colors.green },
    2: { name: 'Medium', color: colors.yellow },
    3: { name: 'Hard', color: colors.red },
  }[level]

  return (
    <span style={{ color }}>
      {name}
    </span>
  )
}
