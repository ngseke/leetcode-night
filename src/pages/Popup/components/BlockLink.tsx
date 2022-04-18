import { AnchorHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import Nullish from '../types/Nullish'

const Wrapper = styled.div({
  display: 'inline-block',
  position: 'relative',
})

const InvisibleLink = styled.a({
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

export default function BlockLink ({ children, href }: BlockLinkProps) {
  return (
    <Wrapper>
      <InvisibleLink
        target="_blank"
        rel="noopener noreferrer"
        href={href ?? ''}
      />
      {children}
    </Wrapper>
  )
}
