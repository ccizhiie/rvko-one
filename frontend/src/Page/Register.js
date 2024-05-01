import { Link } from "react-router-dom";
import React from "react";
import "../mobile.css"; 
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";

const Register = () => {
  return (
    <div className="Register-container">
    <div className="cube">
      <img src={Logo} alt="Logo" className="logo" />
      <img src={Back} alt="back" className="back" />
      <input type="user" name="user" placeholder="Username" />
      <br />
      <input type="email" name="Email" placeholder="Email Adress" />
      <br />
      <input type="pass" name="pass" placeholder="Password" />
      <Link to="/" className="forgot-password">Forgot Password?</Link>
      <br />
      <button>Register</button>
      <br />
      <div className="register-text">
            <p>
              Alredy have an Acount?{" "}
              <Link to="/Login" className="link-register">
                Login
              </Link>
            </p>
          </div>
      </div>
      </div>
  );
};

export default Register;
