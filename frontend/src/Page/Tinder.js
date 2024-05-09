// import { Link } from "react-router-dom";

import { React, useState } from "react";
import axios from "axios";
import "../Home.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";

const Tinder = () => {
  const [error, seterror] = useState([]);
  const [images, setImages] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios("/api/game/url");
  //       if (response.status == 200) {
  //         setImages(response.data());
  //       } else {
  //         seterror(response.data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image URLs:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <div className="container">
      <div className="cube-account">
        <img src={Logo} alt="logo" className="logo-account" />
        <img src={Profil} alt="profil" className="profil-account2" />
        <img src={Back} alt="back" className="back-akun" />
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Tinder;
