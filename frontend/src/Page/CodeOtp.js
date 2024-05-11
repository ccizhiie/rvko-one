import { useNavigate, useParams } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../codeotp.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
// import Eye from "../Asset/eye.png"

const CodeOtp = () => {
  const { uniqueId } = useParams();
  const navigate = useNavigate();
  const [Error, setError] = useState();
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
    const l = uniqueId;
    console.log(l);
    try {
      const response = await axios.post(
        `http://localhost:4000/forgotpassword/otp/${uniqueId}`,
        {
          otp,
        }
      );
      if (response.status === 200) {
        navigate(`/forgot3/${uniqueId}`);
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
          <div class="black-box"></div>
          <div class="white-box">
            <p className="white-pbox">Code OTP</p>
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
            <p className="white-pbox2">Resend code</p>

            <button className="button2" type="submit">
              Verify
            </button>
          </div>

          <img src={Arrow} alt="arrow" className="arrow" />
          <img src={Back} alt="back" className="back" />
          <div className="cube2">
            <h2>Forgot Passwoard</h2>
            <div className="cube-paragraf">
                <p className="pwhite">Enter Your Email Adress to Recieve a Verivication Cord</p>
            </div>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email Adress"
            />
            <br />
            <br />
            <button type="submit">Send</button>

            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CodeOtp;
