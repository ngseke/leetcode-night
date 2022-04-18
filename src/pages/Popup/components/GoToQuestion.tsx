import clsx from 'clsx'
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const isGoButtonDisabled = !submitLink

  return (
    <div className="ts-wrap is-vertical">
      <form className="ts-row" onSubmit={handleSubmit}>
        <div className="column is-fluid">
          <QuestionNumberInput
            value={keyword}
            onChange={setKeyword}
            loading={isLoadingQuestions}
            error={isNotMatched}
          />
        </div>
        <div className="column">
          <button
            className={clsx('ts-button', { 'is-disabled': isGoButtonDisabled })}
            disabled={isGoButtonDisabled}
          >Go</button>
          <HiddenLink ref={questionLinkRef} href={submitLink ?? ''} />
        </div>
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
