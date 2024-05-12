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
        <div className="cube">
          <img src={Logo} alt="Logo" className="logo" />
          <img src={Back} alt="back" className="back" />

          <br />
          <p>Choose Language</p>
          <img src={Globe} alt="globe" className="globe" />
          <select className="option">
            <option value="option1">English</option>
            <option value="option2">Netherlands</option>
          </select>
          <br />
          <Link to="/Forgot2">
            <button type="submit">Login</button>
          </Link>
          <br />
          <Link to="/Forgot2">
            <button type="submit">Register</button>
          </Link>
          <br />
          <Link to="/Forgot2">
            <button type="submit">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Language;
