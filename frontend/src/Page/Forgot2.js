import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../forgoto.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
import { useTranslation } from "react-i18next";

const Forgot2 = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Error, setError] = useState("");
  const [formData, setFormData] = useState({
    emailforgot: "",
  });
  const { emailforgot } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `https://rvko-3-knpn5w7av-maulanas-projects-3821647d.vercel.app/forgotpassword/email`,
        {
          emailforgot,
        }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 2000,
          onClose: () => navigate(`/CodeOtp/${data.uniqueId}`),
        });
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="forgot-container">
      <form onSubmit={handleSubmit}>
        <div className="cube">

          
          
          
          
          <img src={Back} alt="back" className="back" />
          <div className="cube2">

            <div className="arrow-forgot">
              <img src={Arrow} alt="arrow" className="arrow" />
              <h2>{t("FORGOT.p1")}</h2>
            </div>
            <div className="cube-paragraf">
              <p className="p-forgot">{t("FORGOT.p2", "FORGOT.p3")}</p>
            </div>
            <input
              type="email"
              name="emailforgot"
              placeholder={t("FORGOT.p4")}
              onChange={handleChange}
              required
            />
            {<span style={{ color: `red` }}>{Error}</span>}
            <br />
            <br />

            <button type="submit">{t("FORGOT.p5")}</button>

            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot2;
