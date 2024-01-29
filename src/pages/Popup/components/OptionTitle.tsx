import { type PropsWithChildren } from 'react'
import styled from 'styled-components'

const Title = styled.h2.attrs({ className: 'ts-header is-large is-start-icon' })({
  marginBottom: '1rem',
})

export type OptionTitleProps = PropsWithChildren<{
  icon: string,
}>

export function OptionTitle ({ children, icon }: OptionTitleProps) {
  return (
    <Title>
      <span className={`ts-icon is-secondary is-${icon}-icon`} />
      {children}
    </Title>
  )
}
