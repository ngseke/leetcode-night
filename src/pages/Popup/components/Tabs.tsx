import clsx from 'clsx'
import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useStorageState from 'react-use-storage-state'
import { TEST_IDS } from '../../../constants'

export const tabs = {
  questions: {
    icon: 'file-lines',
    testId: TEST_IDS.questionsTab,
  },
  options: {
    icon: 'gear',
    testId: TEST_IDS.optionsTab,
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

interface TabsProps {
  value: TabKey,
  onChange: (value: TabKey) => void,
}

export function Tabs ({ value, onChange }: TabsProps) {
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
              data-testid={tabs[key].testId}
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
