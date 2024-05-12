import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../mobile.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
// import Eye from "../Asset/eye.png"
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation("global");
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
            placeholder={t("LOGIN.p1")}
          />
          <br />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder={t("LOGIN.p2")}
          />
          <Link to="/Forgot2" className="forgot-password">
            {t("LOGIN.p3")}
          </Link>
          <br />
          <button type="submit">{t("LOGIN.p4")}</button>
          <br />
          <div className="register-text">
            <p>
              {t("LOGIN.p5")}{" "}
              <Link to="/Register" className="link-register">
                {t("LOGIN.p6")}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
