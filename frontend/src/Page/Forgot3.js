import { useNavigate, useParams } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../forgoto.css";
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
// import Eye from "../Asset/eye.png"

const Forgot3 = () => {
  const navigate = useNavigate();
  const { uniqueId } = useParams();
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
    try {
      const response = await axios.post(
        `http://localhost:4000/forgotpassword/password/${uniqueId}`,
        {
          passforgot,
          passforgot2,
        }
      );
      if (response.status === 200) {
        navigate(`/login`);
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
