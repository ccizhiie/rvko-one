import { useNavigate, useParams, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import "../home.css";
import axios from "axios";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Home1 from "../Asset/home1.png";
import Game from "../Asset/game1.png";
import { toast } from "react-toastify";
import Play from "../Asset/play.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("global");
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { open } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function opentinder() {
      try {
        if (open === "true" || open === true) {
          toast.info("the opportunity to play has run out", {
            autoClose: 2000,
          });
        } else if (open === "false" || open === false) {
          toast.error("you can only play once", {
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error("Cannot display notifications", {
          autoClose: 2000,
        });
      }
    }

    opentinder();
  });

  const handleChangegame = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const tinder = "open";

      const response = await axios.post(`https://rvko-3-m912d4asa-maulanas-projects-3821647d.vercel.app/home/${id}`, {
        tinder,
      });
      if (response.status === 200) {
        navigate(`/tinder/${id}`);
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container-home">
      <div className="cube-home">
        <img src={Logo} alt="logo" className="logo-home" />
        <Link to={`/account/${id}`}>
          <img src={Profil} alt="profil" className="profil-home" />
        </Link>
        <img src={Back} alt="back" className="back-home" />
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
