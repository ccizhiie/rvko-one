
import { useNavigate, useParams } from "react-router-dom";
import { React, 
  useState, useEffect
 } from "react";

import "../account.css";
import Edit from "../Asset/edit.png";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Wedit from "../Asset/wedit.png";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation("global");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:4000/home/profil/${id}`
        );
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
          password: response.data.password,
        });
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: 2000,
        });
      }
    }

    fetchData();
  }, [id]);

  const { email, username, password, phone } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/home/profil/${id}`,
        {
          email,
          username,
          password,
          phone,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 2000,
          onClose: () => navigate(`/Account/${id}`),
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
    <div className="container-akun">
      <div className="cube-account">
        <img src={Back} alt="back" className="back-akun" />
        <form className="form-akun">
          <img src={Logo} alt="logo" className="logo-account" />
          <img src={Profil} alt="profil" className="profil-account2" />
          <div className="line-akun"></div>
          <img src={Profil} alt="profil" className="profil-account" />
          <img src={Wedit} alt="wedit" className="wedit" />
          <br />
          <div className="form-group">
            <p className="p-account">{t("ACCOUNT.p1")}</p>
            <div className="input-container">
              <input
                className="input-account"
                type="text"
                name="username"
                placeholder={t("ACCOUNT.p1")}
                required
              />
              <img src={Edit} alt="edit" className="edit-icon" />
            </div>
          </div>
          <div className="form-group">
            <p className="p-account">{t("ACCOUNT.p2")}</p>
            <div className="input-container">
              <input
                className="input-account"
                type="text"
                name="email"
                placeholder={t("ACCOUNT.p2")}
                required
              />
              <img src={Edit} alt="edit" className="edit-icon" />
            </div>
          </div>
          <div className="form-group">
            <p className="p-account">{t("ACCOUNT.p3")}</p>
            <div className="input-container">
              <input
                className="input-account"
                type="text"
                name="phone"
                placeholder="+62 590 ***"
                required
              />
              <img src={Edit} alt="edit" className="edit-icon" />
            </div>
          </div>
          <div className="form-group">
            <p className="p-account">{t("ACCOUNT.p4")}</p>
            <div className="input-container">
              <input
                className="input-account"
                type="text"
                name="password"
                placeholder={t("ACCOUNT.p4")}
                required
              />
              <img src={Edit} alt="edit" className="edit-icon" />
            </div>
          </div>
          <br />
          <button className="save-button">{t("ACCOUNT.p5")}</button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Account;
