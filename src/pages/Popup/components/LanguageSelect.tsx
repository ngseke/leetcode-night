import { useTranslation } from 'react-i18next'
import { TEST_IDS } from '../../../constants'

const languages = [
  { name: 'English', value: 'en' },
  { name: '正體中文', value: 'zh-Hant' },
  { name: '简体中文', value: 'zh-Hans' },
  { name: '日本語', value: 'ja' },
  { name: '한국어', value: 'ko' },
]

export function LanguageSelect () {
  const { i18n } = useTranslation()

  return (
    <div className="ts-select is-fluid">
      <select
        data-testid={TEST_IDS.languageSelect}
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
