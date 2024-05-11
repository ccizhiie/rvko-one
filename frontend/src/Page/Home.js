import { useParams, Link } from "react-router-dom";
import React from "react";
import "../home.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Home1 from "../Asset/home1.png";
import Game from "../Asset/game1.png";
import Play from "../Asset/play.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("global");
  const { id } = useParams();
  return (
    <div className="container">
      <div className="cube-account">
        <img src={Logo} alt="logo" className="logo-account" />
        <Link to={`/account/${id}`}>
          {" "}
          <img src={Profil} alt="profil" className="profil-account2" />
        </Link>
        <img src={Back} alt="back" className="back-akun" />
        <img src={Home1} alt="home" className="home" />

        <p className="pwhite-home">{t("HOME.p1")}</p>
        <p className="pblue-home">{t("HOME.p2")}</p>
        <div className="line"></div>
        <div className="trending-cube">
          <p className="title">{t("HOME.p3")}</p>
          {/* <p className="title">{t("HOME.p4")}</p>
          <p className="title">{t("HOME.p5")}</p> */}
          <img src={Game} alt="game" className="game" />
          <img src={Play} alt="play" className="play" />
        </div>
      </div>
    </div>
  );
};

export default Home;
