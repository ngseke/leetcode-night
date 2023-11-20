import clsx from 'clsx'
import { type ReactNode } from 'react'
import styled from 'styled-components'

interface QuestionStatusIconProps {
  children: ReactNode,
  isFinished: boolean,
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Icon = styled.span({
  lineHeight: 1,
  fontSize: '2.5rem',
  marginBottom: '.5rem',
})

export function QuestionDateIcon ({ children, isFinished }: QuestionStatusIconProps) {
  return (
    <Wrapper
      className="ts-text is-bold"
      style={{ color: isFinished ? 'var(--ts-static-positive-500)' : '' }}
    >
      <Icon
        className={clsx(
          'ts-icon',
          isFinished ? 'is-check-icon' : 'is-calendar-days-icon'
        )}
      />
      <span className="ts-text is-small">{children}</span>
    </Wrapper>
  )
}
