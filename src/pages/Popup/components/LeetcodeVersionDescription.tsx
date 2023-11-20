import { useTranslation } from 'react-i18next'
import { type LeetcodeVersion } from '../../Content/leetcode-version'
import { type Nullish } from '../types/Nullish'

export function LeetcodeVersionDescription ({ version }: {
  version: Nullish<LeetcodeVersion>,
}) {
  const { t } = useTranslation()
  const isOldVersion = version === '2022'
  if (!version || isOldVersion) return <></>

  return (
    <div
      className="ts-text is-tiny is-description"
      style={{ paddingLeft: '3rem' }}
    >
      {t('option.enableDarkTheme2023Description')}
    </div>
  )
}
