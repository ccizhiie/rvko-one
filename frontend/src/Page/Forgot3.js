import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../forgoto.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
// import Eye from "../Asset/eye.png"

const Forgot3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rvko-3-eo4hv0zxc-maulanas-projects-3821647d.vercel.app/register",
        {
          email,
          password,
        }
      );
      navigate("/register");
      console.log(response.data);
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
            <h2>Create New Passwoard</h2>
            <div className="cube-paragraf2">
                <p className="pwhite">Enter and confirm your new passwoard</p>
            </div>
            <input
              type="text"
              name="passforgot"
              onChange={handleChange}
              placeholder="New Password"
            />
            <br />
            <input
              type="text"
              name="passforgot2"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <br />
            <button type="submit">Save</button>

            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot3;
