// import { Link } from "react-router-dom";
import React from "react";
import '../Tinderguest.css';
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Tutorial from "../Asset/tutorial.png";


const Tinderguest  = () => {
  return (
    <div className="container">
    <div className="cube-account">
      <img src={Logo} alt="logo" className="logo-account" />
      <img src={Tutorial} alt="tutorial" className="tutorial-tinder" /> 
      <img src={Back} alt="back" className="back-akun" />
      <div className="line"></div>
      <div className="image1"></div>
    </div>
    </div>
  );
};

export default Tinderguest;
