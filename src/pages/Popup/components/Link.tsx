import { forwardRef, type ComponentProps } from 'react'
import styled from 'styled-components'

const AttributedLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})({})

export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof AttributedLink>>(
  (props, ref?) => <AttributedLink {...props} ref={ref} />
)

Link.displayName = 'Link'
