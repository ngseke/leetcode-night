import { SyntheticEvent, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import useDailyChallengeQuestion from '../hooks/useDailyChallengeQuestion'

import useQuestions from '../hooks/useQuestions'
import DailyChallengeQuestionCard from './DailyChallengeQuestionCard'
import Link from './Link'
import QuestionCard from './QuestionCard'
import QuestionKeywordInput from './QuestionKeywordInput'
import HighlightText from './HighlightText'
import fuzzysort from 'fuzzysort'
import Spacer from './Spacer'
import useSelectedIndex from '../hooks/useKeyboardSelection'
import NoResult from './NoResult'

const HiddenLink = styled(Link)({ display: 'none' })

const Wrapper = styled.div.attrs({
  className: 'ts-content',
})({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingBottom: 0,
})

const FixedForm = styled.form({
  flex: 'none',
})

const ScrollableContent = styled.div({
  flex: 1,
  overflow: 'auto',
})

export default function GoToQuestion () {
  const [keyword, setKeyword] = useState('')
  const {
    isLoadingQuestions,
    matchedQuestionById,
    matchedQuestionResultsByKeyword,
    isNotFound,
  } = useQuestions(keyword)

  const questionLinkRef = useRef<HTMLAnchorElement>(null)

  const {
    dailyChallengeQuestion,
    dailyChallengeQuestionUrl,
  } = useDailyChallengeQuestion()

  const shouldDirectToDailyChallenge = !!(!keyword && dailyChallengeQuestion)

  const totalLength =
    (matchedQuestionById ? 1 : 0) +
    (matchedQuestionResultsByKeyword?.length || 0)

  const {
    selectedIndex,
    increaseSelectedIndex,
    decreaseSelectedIndex,
  } = useSelectedIndex(totalLength)

  const selectedQuestion = useMemo(() => {
    if (matchedQuestionById && !selectedIndex) {
      return matchedQuestionById
    }

    const keywordResultIndex = selectedIndex + (matchedQuestionById ? -1 : 0)
    return matchedQuestionResultsByKeyword?.[keywordResultIndex]?.obj
  }, [matchedQuestionById, matchedQuestionResultsByKeyword, selectedIndex])

  const submitLink = shouldDirectToDailyChallenge
    ? dailyChallengeQuestionUrl
    : selectedQuestion?.url

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (submitLink) questionLinkRef.current?.click()
  }

  return (
    <Wrapper>
      <FixedForm onSubmit={handleSubmit}>
        <HiddenLink ref={questionLinkRef} href={submitLink ?? ''} />
        <QuestionKeywordInput
          value={keyword}
          onChange={setKeyword}
          loading={isLoadingQuestions}
          onKeyArrowUp={decreaseSelectedIndex}
          onKeyArrowDown={increaseSelectedIndex}
        />
        <Spacer small />
      </FixedForm>

      <ScrollableContent>
        {
          shouldDirectToDailyChallenge &&
            <DailyChallengeQuestionCard
              question={dailyChallengeQuestion}
              link={dailyChallengeQuestionUrl}
            />
        }
        {
          matchedQuestionById &&
            <QuestionCard
              question={matchedQuestionById}
              isMatchedByQuestionId
              active={selectedQuestion === matchedQuestionById}
            />
        }
        {
          Boolean(matchedQuestionResultsByKeyword?.length) && <>
            {
              matchedQuestionResultsByKeyword?.map((result) => (
                <QuestionCard
                  key={result.obj.stat.question_id}
                  question={result.obj}
                  active={selectedQuestion === result.obj}
                  customTitle={
                    fuzzysort.highlight(result, (match, index) => (
                      <HighlightText key={index}>{match}</HighlightText>
                    ))
                  }
                />
              ))
            }
          </>
        }
        {isNotFound && <NoResult />}
      </ScrollableContent>
    </Wrapper>
  )
}
