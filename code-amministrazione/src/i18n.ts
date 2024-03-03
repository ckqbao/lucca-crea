import i18n from 'i18next'
// import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import locales from './assets/locales'

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'it',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   loadPath: '/locales/it/translation.json',
    // },
    debug: true,
    // react: {
    //   useSuspense: false, // This line is to prevent a Suspense bug with the current version of i18next
    //   wait: false,
    // },
  })

export default i18n
