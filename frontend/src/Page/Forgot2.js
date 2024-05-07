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
      console.log("ppppp");
      const response = await axios.post(
        "http://localhost:4000/forgotpassword/email",
        {
          email,
        }
      );
      console.log("sdddd");
      console.log(response.send);
      if (response.status === 200) {
        navigate("/login");
      } else if (response.status === 404) {
        setError(response.send);
      } else if (response.status === 500) {
        setError(response.send);
      } else {
        setError("Terjadi kesalahan");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="Register-container">
      <form onSubmit={handleSubmit}>
        <div className="cube">
          <img src={Arrow} alt="arrow" className="arrow" />
          <img src={Back} alt="back" className="back" />
          <div className="cube2">
            <h2>Forgot Password</h2>
            <div className="cube-paragraf">
              <p>Enter Your Email Address to Receive a Verification Code</p>
            </div>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email Address"
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

export default Forgot2;
