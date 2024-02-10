import { type PropsWithChildren } from 'react'
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

type BlockLinkProps = PropsWithChildren<{
  href: Nullish<string>,
  'data-testid'?: string,
  'aria-label'?: string,
}>

export function BlockLink (props: BlockLinkProps) {
  const { children, href } = props

  return (
    <Wrapper data-testid={props['data-testid']}>
      <InvisibleLink
        href={href ?? ''}
        aria-label={props['aria-label']}
      />
      {children}
    </Wrapper>
  )
}
