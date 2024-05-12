import { useNavigate, useParams, Link } from "react-router-dom";
import { React, useState } from "react";
import "../home.css";
import axios from "axios";
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
  const navigate = useNavigate();
  const [Error, setError] = useState();
  const handleChangegame = async () => {
    try {
      const tinder = "open";
      const response = await axios.post(`http://localhost:4000/home/${id}`, {
        tinder,
      });
      if (response.status === 200) {
        navigate(`/tinder/${id}`);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <div className="cube-account">
        <img src={Logo} alt="logo" className="logo-account" />
        <Link to={`/account/${id}`}>
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
          <img
            src={Game}
            alt="game"
            className="game"
            onClick={handleChangegame}
          />
          <img
            src={Play}
            alt="play"
            className="play"
            onClick={handleChangegame}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
