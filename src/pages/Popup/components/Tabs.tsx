import clsx from 'clsx'
import { useState } from 'react'

export const tabs = {
  questions: {
    name: 'Questions',
    icon: 'file-lines',
  },
  options: {
    name: 'Options',
    icon: 'gear',
  },
}

export type TabKey = keyof typeof tabs

type TabsProps = {
  value: TabKey,
  onChange (value: TabKey): void,
}

export function useTabs () {
  const [tab, setTab] = useState<TabKey>('questions')

  const isTabOptions = tab === 'options'
  const isTabQuestions = tab === 'questions'

  return { tab, setTab, isTabOptions, isTabQuestions }
}

export default function Tabs ({ value, onChange }: TabsProps) {
  return (
    <div className="ts-tab is-fluid">
      {
        (['questions', 'options'] as const).map((key) => {
          const { name, icon } = tabs[key]
          return (
            <a
              key={key}
              className={clsx('item', { 'is-active': value === key })}
              href="#"
              onClick={() => onChange(key)}
            >
              <span className={clsx('ts-icon', `is-${icon}-icon`)} />
              {name}
            </a>
          )
        })
      }
    </div>
  )
}
