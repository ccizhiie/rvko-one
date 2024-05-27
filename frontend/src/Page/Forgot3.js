import { useNavigate, useParams } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../forgoto.css";
import Back from "../Asset/star.png";
import { toast } from "react-toastify";
import Arrow from "../Asset/arrow.png";
import { useTranslation } from "react-i18next";

const Forgot3 = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Error, setError] = useState();
  const [formData, setFormData] = useState({
    passforgot: "",
    passforgot2: "",
  });

  const { passforgot, passforgot2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `https://rvko-3-ip3erjcyk-maulanas-projects-3821647d.vercel.app/forgotpassword/password/${uniqueId}`,
        {
          passforgot,
          passforgot2,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 2000,
          onClose: () => navigate(`/login`),
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
              <h2>{t("PASSWORD.p1")}</h2>
            </div>
            <div className="cube-paragraf2">
              <p className="pwhite">{t("PASSWORD.p2")}</p>
            </div>
            <input
              type="text"
              name="passforgot"
              onChange={handleChange}
              placeholder={t("PASSWORD.p3")}
              required
            />
            {<span style={{ color: `red` }}>{Error}</span>}
            <br />
            <input
              type="text"
              name="passforgot2"
              onChange={handleChange}
              placeholder={t("PASSWORD.p4")}
              required
            />
            {<span style={{ color: `red` }}>{Error}</span>}
            <br />
            <button type="submit">{t("PASSWORD.p4")}</button>

            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot3;
