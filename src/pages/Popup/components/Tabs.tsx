import clsx from 'clsx'
import React, { useEffect } from 'react'
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

const tabKeys: readonly TabKey[] = ['questions', 'options']

const initialTab = tabKeys[0]

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

  const handleClick = (key: TabKey) =>
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      onChange(key)
    }

  return (
    <div className="ts-tab is-fluid">
      {
        tabKeys.map((key) => {
          const { icon } = tabs[key]
          return (
            <a
              key={key}
              className={clsx('item', { 'is-active': value === key })}
              href="#"
              onClick={handleClick(key)}
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
