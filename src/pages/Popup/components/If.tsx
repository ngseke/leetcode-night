import { memo, type ReactNode } from 'react'

interface IfProps {
  is: boolean,
  children: ReactNode,
}

export const If = memo(({ is, children }: IfProps) => {
  return is ? <>{children}</> : null
})

If.displayName = 'If'
