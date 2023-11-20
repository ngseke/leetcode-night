import { type ReactNode } from 'react'
import styled from 'styled-components'
import { type Nullish } from '../types/Nullish'
import { Link } from './Link'

const Wrapper = styled.div({
  display: 'inline-block',
  position: 'relative',
})

const InvisibleLink = styled(Link)({
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
})

interface BlockLinkProps {
  children: ReactNode,
  href: Nullish<string>,
}

export function BlockLink ({ children, href }: BlockLinkProps) {
  return (
    <Wrapper>
      <InvisibleLink href={href ?? ''} />
      {children}
    </Wrapper>
  )
}
