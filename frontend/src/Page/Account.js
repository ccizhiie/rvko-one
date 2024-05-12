import { useNavigate, useParams } from "react-router-dom";
import { React, useState } from "react";
import "../account.css";
import axios from "axios";
import Edit from "../Asset/edit.png";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Wedit from "../Asset/wedit.png";

const Account = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [Error, setError] = useState();
  const [formData, setFormData] = useState({
    usernmae: "",
    email: "",
    phone: "",
    password: "",
  });
  const { email, usernmae, password, phone } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/home/profil/${id}`,
        {
          email,
          usernmae,
          password,
          phone,
        }
      );
      if (response.status === 200) {
        navigate(`/Account/${id}`);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="cube-account">
        <img src={Logo} alt="logo" className="logo-account" />
        <img src={Profil} alt="profil" className="profil-account" />
        <img src={Profil} alt="profil" className="profil-account2" />
        <img src={Back} alt="back" className="back-akun" />
        <img src={Wedit} alt="wedit" className="wedit" />

        <br />
        <div className="line"></div>

        <p className="p-account">Username</p>
        <input name="username" className="input-account" placeholder="Username" />
        <img src={Edit} alt="edit" className="edit" />

        <p className="p-account">Email Adress</p>
        <input name="email" placeholder="Email Adress" className="input-account" />
        <img src={Edit} alt="edit" className="edit2" />

        <p className="p-account">Phone</p>
        <input name="phone" placeholder="+62 590 ***" className="input-account" />
        <img src={Edit} alt="edit" className="edit3" />

        <p className="p-account">Password</p>
        <input name="password" placeholder="*************" className="input-account" />
        <img src={Edit} alt="edit" className="edit4" />
        <br />
        <button>Save Change</button>
        <br />
      </div>
    </div>
  );
};

export default Account;
