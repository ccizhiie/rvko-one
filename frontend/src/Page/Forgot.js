import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../forgot.css";
// import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";

const Forgot = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        password,
      });
      navigate("/register");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Forgot-container">
      <form onSubmit={handleSubmit}>
      <div className="cube-forgot">

        <img src={Back} alt="back" className="back" />
        <div>
        <img src={Arrow} alt="arrow" className="arrow" />
        <h2>Forgot Passwoard </h2>
        <div className="paragraf">
        <p>Enter Your Email Adress to Recieve a Verivication Cord</p>
        </div>
        <br />
        <input
            type="email"
            name="email"
            // onChange={handleChange}
            placeholder="Email Adress"
          />
          <br />
          <button type="submit">send</button>
        </div>
      </div>
     </form>
    </div>
  );
};

export default Forgot;
