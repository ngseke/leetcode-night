import { type ReactNode, useEffect, useMemo, useRef } from 'react'
import { type Question } from '../types/Question'
import { QuestionMetaChips } from './QuestionMetaChips'
import { Link } from './Link'
import clsx from 'clsx'
import { HighlightText } from './HighlightText'
import styled from 'styled-components'
import { PremiumBadge } from './PremiumBadge'

const Wrapper = styled.div({
  display: 'flex',
})

const IconWrapper = styled.div({
  flex: 'none',
  display: 'flex',
  height: '100%',
  minWidth: '2.75rem',
  paddingTop: '0.5rem',
})

const ContentWrapper = styled.div({
  flex: '1',
})

interface QuestionCardProps {
  question: Question,
  customTitle?: ReactNode,
  isMatchedByQuestionId?: boolean,
  active?: boolean,
}

const QuestionIdText = ({ children, active }: {
  children: ReactNode,
  active?: boolean,
}) => {
  if (active) return <HighlightText>{children}</HighlightText>
  return <span className="ts-text is-secondary"> {children} </span>
}

export function QuestionCard ({
  question,
  customTitle,
  isMatchedByQuestionId,
  active,
}: QuestionCardProps) {
  const acceptanceText = useMemo(() => {
    const { stat } = question

    return `${((stat.total_acs / stat.total_submitted) * 100).toFixed(1)}%`
  }, [question])

  const { url } = question

  const ref = useRef<HTMLAnchorElement | null>(null)
  useEffect(() => {
    if (!active) return
    ref.current?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const isPremium = question.paid_only

  return (
    <Link
      ref={ref}
      className={clsx(
        'ts-content is-interactive is-dense is-rounded',
        { 'is-active': active }
      )}
      href={url ?? ''}
    >
      <Wrapper>
        <IconWrapper>
          <span
            className={clsx(
              'ts-icon is-secondary is-big',
              isMatchedByQuestionId ? 'is-hashtag-icon' : 'is-magnifying-glass-icon'
            )}
          />
        </IconWrapper>

        <ContentWrapper>
          <div
            className="ts-text is-small is-bold"
            style={{ marginBottom: '.25rem' }}
          >
            <QuestionIdText active={isMatchedByQuestionId}>
              {question.stat.frontend_question_id}.{' '}
            </QuestionIdText>
            {customTitle ?? question.title}
            {isPremium && <PremiumBadge />}
          </div>

          <div>
            <QuestionMetaChips
              status={question.status}
              level={question.difficulty.level}
              acceptance={acceptanceText}
            />
          </div>
        </ContentWrapper>
      </Wrapper>
    </Link>
  )
}
