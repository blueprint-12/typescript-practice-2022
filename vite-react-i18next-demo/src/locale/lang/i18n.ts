import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEng from "./translation.en.json";
import translationKor from "./translation.ko.json";
import translationCh from "./translation.zh.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEng,
  },
  ko: {
    translation: translationKor,
  },
  zh: {
    translation: translationCh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ko",
    fallbackLng: "ko",
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
