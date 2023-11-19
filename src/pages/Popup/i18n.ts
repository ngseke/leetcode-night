import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationEN from './langs/en.json'
import translationZhHant from './langs/zh-Hant.json'
import translationZhHans from './langs/zh-Hans.json'
import translationJa from './langs/ja.json'
import translationKo from './langs/ko.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      'zh-Hant': { translation: translationZhHant },
      'zh-Hans': { translation: translationZhHans },
      ja: { translation: translationJa },
      ko: { translation: translationKo },
    },
    fallbackLng: {
      'zh-TW': ['zh-Hant', 'en'],
      'zh-HK': ['zh-Hant', 'en'],
      'zh-MO': ['zh-Hant', 'en'],

      'zh-CN': ['zh-Hans', 'en'],
      'zh-SG': ['zh-Hans', 'en'],
      'zh-MY': ['zh-Hans', 'en'],

      'ja-JP': ['ja', 'en'],
      ja: ['ja', 'en'],

      'ko-KR': ['ko', 'en'],
      ko: ['ko', 'en'],

      default: ['en'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
