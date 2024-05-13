import { Link } from "react-router-dom";
import React from "react";
import "../language.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Globe from "../Asset/globe.png";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation("global");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="container">
      <form>
        <div className="cube-bahasa">
          <img src={Logo} alt="Logo" className="logo-bahasa" />
          <img src={Back} alt="back" className="back" />

          <br />
          <p className="p-bahasa">{t("LANGUAGE.p1")}</p>
          <div className="bahasa">
            <img src={Globe} alt="globe" className="globe" />
            <select
              className="option"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="nl">Netherlands</option>
              <option value="es">Spanyol</option>
            </select>
          </div>

          <div className="all-button">
            <br />
            <Link to="/login">
              <button type="submit" className="purple-button">
                {t("LANGUAGE.p3")}
              </button>
            </Link>
            <br />
            <Link to="/register">
              <button type="submit" className="grey-button">
                {t("LANGUAGE.p4")}
              </button>
            </Link>
            <br />
            <Link to="/Forgot2">
              <button type="submit" className="grey-button">
                {t("LANGUAGE.p5")}
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Language;
