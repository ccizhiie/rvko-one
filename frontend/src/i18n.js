import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "./language/en/global.json";
import global_es from "./language/es/global.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

import React from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
      </div>
      <div>{t("test")}</div>
    </div>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Page />
    </I18nextProvider>
  );
}
