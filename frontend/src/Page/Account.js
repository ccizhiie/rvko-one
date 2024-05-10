import { useNavigate, useParams } from "react-router-dom";
import { React, useState, useEffect } from "react";
import "../account.css";
import axios from "axios";
import Edit from "../Asset/edit.png";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Wedit from "../Asset/wedit.png";

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Error, setError] = useState();
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
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const { email, username, password, phone } = formData;

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
          username,
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
        <form onSubmit={handleSubmit}>
          <p className="p-account">Username</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
          />
          <img src={Edit} alt="edit" className="edit" />

          <p className="p-account">Email Adress</p>
          <input
            type="text"
            name="email"
            placeholder="Email Adress"
            onChange={handleChange}
            value={email}
          />
          <img src={Edit} alt="edit" className="edit2" />

          <p className="p-account">Phone</p>
          <input
            type="text"
            name="phone"
            placeholder="+62 590 ***"
            onChange={handleChange}
            value={phone}
          />
          <img src={Edit} alt="edit" className="edit3" />

          <p className="p-account">Password</p>
          <input
            type="text"
            name="password"
            placeholder="*************"
            onChange={handleChange}
            value={password}
          />
          <img src={Edit} alt="edit" className="edit4" />
          <br />
          <button>Save Change</button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Account;
