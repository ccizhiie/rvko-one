import React from "react";
import { useTranslation } from "react-i18next";

const Coba = () => {
  const { t, i18n } = useTranslation("global");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeLanguage("es")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        <br></br>
        <h1>{t("FORGOT.p1")}</h1>
      </div>
    </div>
  );
};

export default Coba;
