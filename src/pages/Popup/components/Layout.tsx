import styled from 'styled-components'
import { type ReactNode } from 'react'

const Wrapper = styled.div({ height: '100%' })

type LayoutProps = Record<'header' | 'body' | 'footer', ReactNode>

export function Layout ({ header, body, footer }: LayoutProps) {
  return (
    <Wrapper className="ts-app-layout is-vertical">
      <div className="cell">
        {header}
      </div>

      <div className="cell is-scrollable" style={{ flex: 1 }}>
        {body}
      </div>

      <div className="cell">
        {footer}
      </div>
    </Wrapper>
  )
}
