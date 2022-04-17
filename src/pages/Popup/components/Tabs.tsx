import clsx from 'clsx'

type TabsProps = {
  value: number,
  onChange(value: number): void,
}

export const tabs = [
  {
    name: 'Questions',
    icon: 'file-lines',
  },
  {
    name: 'Dark Theme',
    icon: 'moon',
  },
]

export default function Tabs ({ value, onChange }: TabsProps) {
  return (
    <div className="ts-tab is-fluid">
      {
        tabs.map(({ name, icon }, index) => (
          <a
            key={index}
            className={clsx('item', { 'is-active': value === index })}
            href="#a"
            onClick={() => onChange(index)}
          >
            <span className={clsx('ts-icon', `is-${icon}-icon`)} />
            {name}
          </a>
        ))
      }
    </div>
  )
}
