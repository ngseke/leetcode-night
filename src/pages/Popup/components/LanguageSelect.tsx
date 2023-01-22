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
  const { i18n } = useTranslation()
  const { resolvedLanguage, changeLanguage } = i18n

  return (
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
  )
}
