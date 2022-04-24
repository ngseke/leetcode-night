import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationEN from './langs/en.json'
import translationZhHant from './langs/zh-Hant.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      'zh-Hant': {
        translation: translationZhHant,
      },
    },
    fallbackLng: {
      'zh-TW': ['zh-Hant', 'en'],
      'zh-HK': ['zh-Hant', 'en'],
      'zh-MO': ['zh-Hant', 'en'],
      default: ['en'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
