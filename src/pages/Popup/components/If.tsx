import { memo, ReactNode } from 'react'

interface IfProps {
  is: boolean,
  children: ReactNode,
}

const If = ({ is, children }: IfProps) => {
  return is ? <>{children}</> : null
}

export default memo(If)
