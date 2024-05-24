import { useNavigate, useParams } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../codeotp.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
import { useTranslation } from "react-i18next";

const CodeOtp = () => {
  const { t } = useTranslation("global");
  const { uniqueId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const { digit1, digit2, digit3, digit4 } = formData;
  const otp = `${digit1}${digit2}${digit3}${digit4}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `https://rvko-3-m912d4asa-maulanas-projects-3821647d.vercel.app/forgotpassword/otp/${uniqueId}`,
        {
          otp,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 2000,
          onClose: () => navigate(`/forgot3/${uniqueId}`),
        });
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="CodeOtp-container">
      <form onSubmit={handleSubmit}>
        <div className="cube-codeotp">
          <div class="black-box"></div>
          <div class="white-box">
            <p className="white-pbox">{t("OTP.p1")}</p>
            <div class="otp-input-container">
              <input
                type="text"
                maxlength="1"
                name="digit1"
                onChange={handleChange}
              />
              <input
                type="text"
                maxlength="1"
                name="digit2"
                onChange={handleChange}
              />
              <input
                type="text"
                maxlength="1"
                name="digit3"
                onChange={handleChange}
              />
              <input
                type="text"
                maxlength="1"
                name="digit4"
                onChange={handleChange}
              />
            </div>
            <p className="white-pbox2">{t("OTP.p2")}</p>

            <button className="button2" type="submit">
              {t("OTP.p3")}
            </button>
          </div>

          <img src={Back} alt="back" className="back" />
          <div className="cube2">

          <div className="arrow-forgot">
              <img src={Arrow} alt="arrow" className="arrow" />
              <h2>{t("FORGOT.p1")}</h2>
            </div>
            
            <div className="cube-paragraf">
              <p>{t("FORGOT.p2", "FORGOT.p3")}</p>
            </div>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder={t("FORGOT.p4")}
            />
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

export default CodeOtp;
