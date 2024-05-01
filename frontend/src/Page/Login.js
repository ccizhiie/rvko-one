import { Link } from "react-router-dom";
import React from "react";
import "../mobile.css"; 
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
// import Eye from "../Asset/eye.png"

const Login = () => {
  return (
    <div className="Register-container">
    <div className="cube">
      <img src={Logo} alt="Logo" className="logo" />
      <img src={Back} alt="back" className="back" />
      <input type="user" name="user" placeholder="Username or Email Adress" />
      <br />
      <input type="pass" name="pass" placeholder="Password" />
      <br />
      <Link to="/" className="forgot-password">Forgot Password?</Link>
      <br />
      <button>Login</button>
      <br />
      <div className="register-text">
            <p>
              Don't have an Acount?{" "}
              <Link to="/Register" className="link-register">
                Register
              </Link>
            </p>
          </div>
      </div>
      </div>
  );
};

export default Login;
