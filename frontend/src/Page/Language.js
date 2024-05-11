import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import "../language.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";

const Language = () => {
  return (
    <div className="container">
      {" "}
      <form>
        <div className="cube">
          <img src={Logo} alt="Logo" className="logo" />
          <img src={Back} alt="back" className="back" />
          <br />
          <p>Choose Language</p>
          <br />

          <select className="option">
            <option value="option1">English</option>
            <option value="option2">Netherlands</option>
            <option value="option2">Spanyol</option>
          </select>
          <br />
        </div>
      </form>
    </div>
  );
};

export default Language;
