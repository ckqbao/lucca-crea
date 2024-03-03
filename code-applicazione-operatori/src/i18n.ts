import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import locales from './assets/locales'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'it',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  })

export default i18n
