import { forwardRef } from 'react'

const Link = forwardRef<HTMLAnchorElement, React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>(function Link (props, ref) {
  return (
    <a
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
})

export default Link
