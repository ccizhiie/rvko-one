import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../Mobile.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password,
      });
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Register-container">
      <form onSubmit={handleSubmit}>
        <div className="cube">
          <img src={Logo} alt="Logo" className="logo" />
          <img src={Back} alt="back" className="back" />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
          />
          <br />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email Adress"
          />
          <br />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Link to="/" className="forgot-password">
            Forgot Password?
          </Link>
          <br />
          <button type="submit">Register</button>
          <br />
          <div className="register-text">
            <p className="p-register">
              Alredy have an Acount? 
              <Link to="/Login" className="link-register">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
