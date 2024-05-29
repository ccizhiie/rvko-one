import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
//import axios from "axios";
import "../mobile.css";
import { toast } from "react-toastify";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [E, setE] = useState();
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
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("https://rvko-3-ip3erjcyk-maulanas-projects-3821647d.vercel.app/register", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 2000,
          onClose: () => navigate(`/login`),
        });
      }
    } catch (error) {
      setE(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="Register-container">
      <form onSubmit={handleSubmit}>
        <div className="cube">
          <img src={Logo} alt="Logo" className="logo-register" />
          <img src={Back} alt="back" className="back" />
          <input
            type="text"
            name="username"
            className="input-loreg"
            onChange={handleChange}
            placeholder={t("REGISTER.p1")}
            required
          />
          {<span style={{ color: `red` }}>{E}</span>}
          <br />
          <input
            type="text"
            name="email"
            className="input-loreg"
            onChange={handleChange}
            placeholder={t("REGISTER.p2")}
            required
          />
          {<span style={{ color: `red` }}>{E}</span>}
          <br />
          <input
            type="text"
            name="password"
            className="input-loreg"
            onChange={handleChange}
            placeholder={t("REGISTER.p3")}
            required
          />
          <Link to="/forgot2" className="forgot-password">
            {t("REGISTER.p4")}
          </Link>
          <br />
          <button type="submit">{t("REGISTER.p5")}</button>
          <br />
          <div className="register-text">
            <p className="p-register">
              {t("REGISTER.p6")}
              <Link to="/Login" className="link-register">
                {t("REGISTER.p7")}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
