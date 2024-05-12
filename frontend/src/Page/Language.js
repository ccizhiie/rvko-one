import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../language.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Globe from "../Asset/globe.png";

const Language = () => {
  return (
    <div className="container">
      <form>
        <div className="cube-bahasa">
          <img src={Logo} alt="Logo" className="logo-bahasa" />
          <img src={Back} alt="back" className="back" />

          <br />
          <p className="p-bahasa">Choose Language</p>
          <div className="bahasa">
            <img src={Globe} alt="globe" className="globe" />
            <select className="option">
              <option value="option1">English</option>
              <option value="option2">Netherlands</option>
            </select>
          </div>

          <div className="all-button">
            <br />
            <Link to="/login">
            <button type="submit" className="purple-button">Login</button>
            </Link>
            <br/>
            <Link to="/register">
            <button type="submit" className="grey-button">Register</button>
            </Link>
            <br/>
            <Link to="/Forgot2">
            <button type="submit" className="grey-button">Play as Guest</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Language;
