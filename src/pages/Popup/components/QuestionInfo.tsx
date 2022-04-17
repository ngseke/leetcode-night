import React, { FC, useMemo } from 'react'
import Question from '../types/Question'
import QuestionDifficultyText from './QuestionDifficultyText'
import QuestionStatusIcon from './QuestionStatusIcon'

interface QuestionInfoProps {
  question: Question,
}

const Chip: FC = ({ children }) => {
  return (
    <div className="ts-chip is-outlined is-small is-end-spaced">
      {children}
    </div>
  )
}

export default function QuestionInfo({ question }: QuestionInfoProps) {
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
    <div className="ts-conversation">
      <div className="content">
        <div className="bubble">
          <div className="author">{title}</div>
          <div className="text">
            <div className="ts-space is-small" />
            <Chip>
              <QuestionStatusIcon status={question.status} />
            </Chip>
            <Chip>
              <QuestionDifficultyText level={question.difficulty.level} />
            </Chip>
            <Chip>{acceptanceText}</Chip>
          </div>
        </div>
      </div>
    </div>
  )
}
