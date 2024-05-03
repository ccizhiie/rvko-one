import { Link } from "react-router-dom";
import React from "react";
import "../mobile.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
// import Eye from "../Asset/eye.png"

const Login = () => {
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
    <div className="Register-container">
      <form onSubmit={handleSubmit}>
      <div className="cube">
        <img src={Logo} alt="Logo" className="logo" />
        <img src={Back} alt="back" className="back" />

        <input
            type="user"
            name="username"
            onChange={handleChange}
            placeholder="Username or Email Adress"
          />
          <br />
          <input
            type="pass"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
        <Link to="/" className="forgot-password">
          Forgot Password?
        </Link>
        <br />
        <button type="submit">Login</button>
        <br />
        <div className="register-text">
          <p>
            Don't have an Acount?{" "}
            <Link to="/Register" className="link-register">
              Register
            </Link>
          </p>
        </div>
      </div>
     </form>
    </div>
  );
};

export default Login;
