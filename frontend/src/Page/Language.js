import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
        <div className="cube">
          <img src={Logo} alt="Logo" className="logo" />
          <img src={Back} alt="back" className="back" />

          <br />
          <p>{t("LANGUAGE.p1")}</p>
          <img src={Globe} alt="globe" className="globe" />
          <select
            className="option"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="nl">Netherlands</option>
            <option value="es">Spanyol</option>
          </select>
          <br />
          <Link to="/Forgot2">
            <button type="submit">{t("LANGUAGE.p2")}</button>
          </Link>
          <br />
          <Link to="/Forgot2">
            <button type="submit">{t("LANGUAGE.p3")}</button>
          </Link>
          <br />
          <Link to="/Forgot2">
            <button type="submit">{t("LANGUAGE.p4")}</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Language;
