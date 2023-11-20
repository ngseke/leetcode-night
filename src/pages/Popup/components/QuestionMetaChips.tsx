import { type Question, type Difficulty } from '../types/Question'
import { Chip } from './Chip'
import { QuestionDifficultyText } from './QuestionDifficultyText'
import { QuestionStatusIcon } from './QuestionStatusIcon'

interface QuestionMetaChipsProps {
  status: Question['status'],
  level: Difficulty['level'],
  acceptance: string,
}

export function QuestionMetaChips (
  { status, level, acceptance }: QuestionMetaChipsProps
) {
  return (
    <div>
      <Chip>
        <QuestionStatusIcon status={status} />
      </Chip>
      <Chip>
        <QuestionDifficultyText level={level} />
      </Chip>
      <Chip>{acceptance}</Chip>
    </div>
  )
}
