import clsx from 'clsx'
import { useMemo } from 'react'
import DailyChallengeQuestion from '../types/DailyChallengeQuestion'
import Nullish from '../types/Nullish'
import BlockLink from './BlockLink'
import QuestionDateIcon from './QuestionDateIcon'
import QuestionMetaChips from './QuestionMetaChips'
import Spacer from './Spacer'

interface DailyChallengeQuestionCardProps {
  question: DailyChallengeQuestion,
  link: Nullish<string>,
}

export default function DailyChallengeQuestionCard (
  { question, link }: DailyChallengeQuestionCardProps
) {
  const title = useMemo(() => {
    if (!question) return null
    const { frontendQuestionId: id, title } = question.question

    return `${id}. ${title}`
  }, [question])

  const acceptanceText = useMemo(() => {
    return `${question.question.acRate.toFixed(1)}%`
  }, [question])

  const level = useMemo(() => ({
    Easy: 1,
    Medium: 2,
    Hard: 3,
  } as const)[question.question.difficulty], [question.question.difficulty])

  const isFinished = question.userStatus === 'Finish'

  return (
    <BlockLink href={link}>
      <div
        className={clsx('ts-box is-collapsed is-left-indicated', {
          'is-positive': isFinished,
        })}
      >
        <div className="ts-content is-dense">
          <div className="ts-text is-small">
            <QuestionDateIcon isFinished={isFinished}>
              {question.date}
            </QuestionDateIcon>
          </div>

          <div className="ts-header is-heavy">{title}</div>

          <Spacer small />

          <QuestionMetaChips
            status={question.question.status}
            level={level}
            acceptance={acceptanceText}
          />
        </div>
      </div>
    </BlockLink>
  )
}
