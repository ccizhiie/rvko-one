// import { Link } from "react-router-dom";
import React from "react";
import '../Account.css';
import Edit from "../Asset/edit.png";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Wedit from "../Asset/wedit.png";


const Home = () => {
  return (
    <div className="container">
    <div className="cube-account">
      <img src={Logo} alt="logo" className="logo-account" />
      <img src={Profil} alt="profil" className="profil-account" /> 
      <img src={Back} alt="back" className="back" />
      <img src={Wedit} alt="wedit" className="wedit" />
      
      <br />
      <div className="line"></div>

     
      <p className="p-account" >Username</p>
      <input type= "text" name="input" placeholder="Username" />
      <img src={Edit} alt="edit" className="edit" />
      
      <p className="p-account" >Email Adress</p>
      <input type= "text" name="input" placeholder="Email Adress" />
      <img src={Edit} alt="edit" className="edit2" />
      
      <p className="p-account" >Phone</p>
      <input type= "text" name="input" placeholder="+62 590 ***" />
      <img src={Edit} alt="edit" className="edit3" />
      
      <p className="p-account" >Password</p>
      <input type= "text" name="input" placeholder="*************" />
      <img src={Edit} alt="edit" className="edit4" />
      <br />
      <button>Save Change</button>
      <br />
      
      </div>
      </div>
  );
};

export default Home;
