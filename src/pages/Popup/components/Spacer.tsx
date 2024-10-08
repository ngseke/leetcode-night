import clsx from 'clsx'

interface SpacerProps {
  small?: boolean,
}

export function Spacer ({ small }: SpacerProps) {
  return (
    <div
      className={clsx('ts-space', {
        'is-small': small,
      })}
    />
  )
}
