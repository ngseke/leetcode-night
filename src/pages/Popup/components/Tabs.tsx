import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const tabs = {
  questions: {
    icon: 'file-lines',
  },
  options: {
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
  const { t } = useTranslation()

  return (
    <div className="ts-tab is-fluid">
      {
        (['questions', 'options'] as const).map((key) => {
          const { icon } = tabs[key]
          return (
            <a
              key={key}
              className={clsx('item', { 'is-active': value === key })}
              href="#"
              onClick={() => onChange(key)}
            >
              <span className={clsx('ts-icon', `is-${icon}-icon`)} />
              {t(`tab.${key}`)}
            </a>
          )
        })
      }
    </div>
  )
}
