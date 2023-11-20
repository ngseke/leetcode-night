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

export function LanguageSelect () {
  const { i18n } = useTranslation()

  return (
    <div className="ts-select is-fluid">
      <select
        value={i18n.resolvedLanguage}
        onChange={e => i18n.changeLanguage(e.target.value)}
      >
        {
          languages.map(({ name, value }) => (
            <option key={value} value={value}>{name}</option>
          ))
        }
      </select>
    </div>
  )
}
