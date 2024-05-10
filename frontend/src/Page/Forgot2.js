import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../forgoto.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
// import Eye from "../Asset/eye.png"

const Forgot2 = () => {
  const navigate = useNavigate();
  const [Error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://rvko-3-eo4hv0zxc-maulanas-projects-3821647d.vercel.app/forgotpassword/email`,
        {
          email,
        }
      );
      if (response.status === 200) {
        navigate(`/CodeOtp/${response.data.email}`);
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
          <img src={Arrow} alt="arrow" className="arrow" />
          <img src={Back} alt="back" className="back" />
          <div className="cube2">
            <h2>Forgot Passwoard</h2>
            <div className="cube-paragraf">
              <p className="pwhite">Enter Your Email Address to Receive a Verification Code</p>
            </div>
        <input
            type="email"
            name="pass-forgot"
            // onChange={handleChange}
            placeholder="Email Adress"
          />
          <br />
        <br />
        <button type="submit">Send</button>
        
        <br />
        </div></div>
      </form>
    </div>
  );
};

export default Forgot2;
