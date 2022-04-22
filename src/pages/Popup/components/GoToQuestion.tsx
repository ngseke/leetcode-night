import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useDailyChallengeQuestion from '../hooks/useDailyChallengeQuestion'

import useQuestions from '../hooks/useQuestions'
import DailyChallengeQuestionCard from './DailyChallengeQuestionCard'
import Link from './Link'
import QuestionCard from './QuestionCard'
import QuestionNumberInput from './QuestionNumberInput'

const HiddenLink = styled(Link)({ display: 'none' })

export default function GoToQuestion () {
  const [keyword, setKeyword] = useState('')
  const {
    isLoadingQuestions,
    matchedQuestion,
    matchedQuestionUrl,
    isNotMatched,
  } = useQuestions(keyword)

  const questionLinkRef = useRef<HTMLAnchorElement>(null)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    questionLinkRef.current?.click()
  }
  const {
    dailyChallengeQuestion,
    dailyChallengeQuestionUrl,
  } = useDailyChallengeQuestion()

  const shouldDirectToDailyChallenge = (!keyword && dailyChallengeQuestion)

  const submitLink = shouldDirectToDailyChallenge
    ? dailyChallengeQuestionUrl
    : matchedQuestionUrl

  return (
    <div className="ts-wrap is-vertical">
      <form onSubmit={handleSubmit}>
        <QuestionNumberInput
          value={keyword}
          onChange={setKeyword}
          loading={isLoadingQuestions}
          error={isNotMatched}
        />
        <HiddenLink ref={questionLinkRef} href={submitLink ?? ''} />
      </form>

      <div>
        {
          shouldDirectToDailyChallenge &&
            <DailyChallengeQuestionCard
              question={dailyChallengeQuestion}
              link={dailyChallengeQuestionUrl}
            />
        }
        {
          matchedQuestion &&
            <QuestionCard
              question={matchedQuestion}
              link={matchedQuestionUrl}
            />
        }
      </div>
    </div>
  )
}
