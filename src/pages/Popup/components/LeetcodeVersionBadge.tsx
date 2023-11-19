import { useTranslation } from 'react-i18next'
import { LeetcodeVersion } from '../../Content/leetcode-version'
import { Nullish } from '../types/Nullish'

export function LeetcodeVersionBadge ({ version }: {
  version: Nullish<LeetcodeVersion>,
}) {
  const { t } = useTranslation()
  if (!version) return <></>

  const isOldVersion = version === '2022'
  const badgeText = isOldVersion
    ? t('option.oldVersionLeetcode')
    : t('option.newVersionLeetcode')

  return (
    <span className="ts-badge is-small is-secondary is-accent is-success is-start-spaced">
      {badgeText}
    </span>
  )
}
