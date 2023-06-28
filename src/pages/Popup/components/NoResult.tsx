import { useTranslation } from 'react-i18next'

export function NoResult () {
  const { t } = useTranslation()

  return (
    <div
      className="ts-header is-heavy is-secondary is-icon"
      style={{ paddingTop: '2rem' }}
    >
      <div className="ts-icon is-magnifying-glass-icon" />
      {t('status.noResult')}
    </div>
  )
}
