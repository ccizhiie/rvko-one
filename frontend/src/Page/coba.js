import React from "react";
import "../home.css";
import { useTranslation } from "react-i18next";

const Coba = () => {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container">
      <h1>{t("forgot.p1")}</h1>
      <button onClick={() => handleChangeLanguage("en")}></button>
      <button onClick={() => handleChangeLanguage("es")}></button>
    </div>
  );
};

export default Coba;
