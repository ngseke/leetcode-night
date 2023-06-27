import { useMemo } from 'react'
import DailyChallengeQuestion from '../types/DailyChallengeQuestion'
import Nullish from '../types/Nullish'
import BlockLink from './BlockLink'
import QuestionDateIcon from './QuestionDateIcon'
import QuestionMetaChips from './QuestionMetaChips'
import Spacer from './Spacer'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
})

const IconWrapper = styled.div({
  flex: 'none',
  display: 'flex',
  justifyContent: 'center',
  minWidth: '8rem',
})

const ContentWrapper = styled.div({
  flex: '1',
  paddingLeft: 0,
})

interface DailyChallengeQuestionCardProps {
  question: DailyChallengeQuestion,
  link: Nullish<string>,
}

export default function DailyChallengeQuestionCard (
  { question, link }: DailyChallengeQuestionCardProps
) {
  const { t } = useTranslation()

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
      <div className="ts-box">
        <Wrapper>
          <IconWrapper>
            <QuestionDateIcon isFinished={isFinished}>
              {question.date}
            </QuestionDateIcon>
          </IconWrapper>
          <ContentWrapper className="ts-content is-dense is-horizontally-fitted">
            <div className="ts-text is-small is-secondary">
              {t('title.dailyChallenge')}
            </div>

            <div className="ts-header is-heavy">{title}</div>

            <Spacer small />

            <QuestionMetaChips
              status={question.question.status}
              level={level}
              acceptance={acceptanceText}
            />
          </ContentWrapper>
        </Wrapper>
      </div>
    </BlockLink>
  )
}
