import { useMemo } from 'react'
import Nullish from '../types/Nullish'
import Question from '../types/Question'
import BlockLink from './BlockLink'
import QuestionMetaChips from './QuestionMetaChips'

interface QuestionCardProps {
  question: Question,
  link: Nullish<string>,
}

export default function QuestionCard ({ question, link }: QuestionCardProps) {
  const title = useMemo(() => {
    if (!question) return null
    const { stat } = question
    return `${stat.frontend_question_id}. ${stat.question__title}`
  }, [question])

  const acceptanceText = useMemo(() => {
    const { stat } = question

    return `${((stat.total_acs / stat.total_submitted) * 100).toFixed(1)}%`
  }, [question])

  return (
    <BlockLink href={link}>
      <div className="ts-conversation">
        <div className="content">
          <div className="bubble">
            <div className="author" style={{ userSelect: 'text' }}>
              {title}
            </div>
            <div className="text">
              <div className="ts-space is-small" />
              <QuestionMetaChips
                status={question.status}
                level={question.difficulty.level}
                acceptance={acceptanceText}
              />
            </div>
          </div>
        </div>
      </div>
    </BlockLink>
  )
}
