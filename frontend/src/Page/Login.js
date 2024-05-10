import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../mobile.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
// import Eye from "../Asset/eye.png"

const Login = () => {
  const navigate = useNavigate();
  const [Error, setError] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, password, email } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      email: name === "username" ? value : prevData.email,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rvko-3-eo4hv0zxc-maulanas-projects-3821647d.vercel.app/login",
        {
          username,
          email,
          password,
        }
      );
      if (response.status === 200) {
        navigate(`/Home/${response.data.id}`);
      } else {
        setError(response.data.error);
      }
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
            placeholder="Username or Email Adress"
          />
          <br />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Link to="/Forgot2" className="forgot-password">
            Forgot Password?
          </Link>
          <br />
          <button type="submit">Login</button>
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
      </form>
    </div>
  );
};

export default Login;
