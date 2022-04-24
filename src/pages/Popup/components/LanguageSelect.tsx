import { useTranslation } from 'react-i18next'

const languages = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: '正體中文',
    value: 'zh-Hant',
  },
]

export default function LanguageSelect () {
  const { t, i18n } = useTranslation()
  const { resolvedLanguage, changeLanguage } = i18n

  return (
    <div>
      <span className="ts-text is-label">
        {t('select.language.label')}
      </span>
      <div className="ts-space is-small" />
      <div className="ts-select is-fluid">
        <select
          value={resolvedLanguage}
          onChange={e => changeLanguage(e.target.value)}
        >
          {
          languages.map(({ name, value }) => (
            <option key={value} value={value}>{name}</option>
          ))
        }
        </select>
      </div>
    </div>
  )
}
