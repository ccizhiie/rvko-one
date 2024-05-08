// import { Link } from "react-router-dom";
import React from "react";
import '../Home.css';
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";


const Tinder = () => {
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
