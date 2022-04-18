import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useQuestions from '../hooks/useQuestions'
import QuestionInfo from './QuestionInfo'
import QuestionNumberInput from './QuestionNumberInput'

const HiddenLink = styled.a({ display: 'none' })

export default function GoToQuestion () {
  const [keyword, setKeyword] = useState('')
  const { isLoadingQuestions, matchedQuestion, matchedQuestionUrl } = useQuestions(keyword)

  const isGoButtonDisabled = !matchedQuestion

  const questionLinkRef = useRef<HTMLAnchorElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    questionLinkRef.current?.click()
  }

  return (
    <div className="ts-wrap is-vertical">
      <form className="ts-row" onSubmit={handleSubmit}>
        <div className="column is-fluid">
          <QuestionNumberInput
            value={keyword}
            onChange={setKeyword}
            loading={isLoadingQuestions}
          />
        </div>
        <div className="column">
          <button
            className={clsx('ts-button', { 'is-disabled': isGoButtonDisabled })}
            disabled={isGoButtonDisabled}
          >Go</button>
          <HiddenLink
            ref={questionLinkRef}
            target="_blank"
            rel="noopener noreferrer"
            href={matchedQuestionUrl ?? ''}
          />
        </div>
      </form>
      {matchedQuestion && <QuestionInfo question={matchedQuestion} />}
    </div>
  )
}
