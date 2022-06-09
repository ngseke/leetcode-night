import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useStorageState from 'react-use-storage-state'

export const tabs = {
  questions: {
    icon: 'file-lines',
  },
  options: {
    icon: 'gear',
  },
}

export type TabKey = keyof typeof tabs

const initialTab: TabKey = 'questions'

export function useTabs () {
  const [tab, setTab] = useStorageState<TabKey>('tab', initialTab)

  const isTabQuestions = tab === 'questions'
  const isTabOptions = tab === 'options'

  useEffect(function handleInvalidTab () {
    const isValid = Object.keys(tabs).includes(tab)
    if (!isValid) setTab(initialTab)
  }, [setTab, tab])

  return { tab, setTab, isTabOptions, isTabQuestions }
}

type TabsProps = {
  value: TabKey,
  onChange (value: TabKey): void,
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
