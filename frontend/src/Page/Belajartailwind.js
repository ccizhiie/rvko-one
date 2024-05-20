import { useNavigate, useParams, Link } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Home1 from "../Asset/home1.png";
import Game from "../Asset/game1.png";
import Play from "../Asset/play.png";

const Belajartailwind = () => {
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
    <div className="container mx-auto">
      <div className="cube-account flex flex-col items-center">
        <img src={Logo} alt="logo" className="logo-account" />
        <Link to={`/account/${id}`}>
          <img src={Profil} alt="profil" className="profil-account2" />
        </Link>
        <img src={Back} alt="back" className="back-akun" />
        <img src={Home1} alt="home" className="home" />

        <p className="text-white">{t("HOME.p1")}</p>
        <p className="text-blue">{t("HOME.p2")}</p>
        <div className="line h-px bg-gray-400 w-full my-4"></div>
        <div className="trending-cube">
          <p className="title">{t("HOME.p3")}</p>
          
          <img
            src={Game}
            alt="game"
            className="game cursor-pointer"
            onClick={handleChangegame}
          />

          <img
            src={Play}
            alt="play"
            className="play cursor-pointer"
            onClick={handleChangegame}
          />
        </div>
      </div>
    </div>
  );
};

export default Belajartailwind;
