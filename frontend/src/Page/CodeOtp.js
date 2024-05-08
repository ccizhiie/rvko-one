// import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
// import axios from "axios";
import "../Codeotp.css"
import Back from "../Asset/star.png";
import Arrow from "../Asset/arrow.png";
// import Eye from "../Asset/eye.png"

const CodeOtp = () => {

  return (
    <div className="Register-container">
      <form 
      // onSubmit={handleSubmit}
      
      >
      <div className="cube">
        <div class="black-box"></div>
        <div class="white-box">
            <p className="white-pbox">Code OTP</p>
        <div class="otp-input-container">
            <input type="text" maxlength="1" id="digit1" 
            // onChange={handleChange}
            />
            <input type="text" maxlength="1" id="digit2" 
            // onChange={handleChange}
            />
            <input type="text" maxlength="1" id="digit3" 
            // onChange={handleChange}
            />
            <input type="text" maxlength="1" id="digit4" 
            // onChange={handleChange}
            />
        </div>
            <p className="white-pbox2">Resend code</p>
            
            <button className="button2" type="submit">Verify</button>
        </div>

        <img src={Arrow} alt="arrow" className="arrow"/>
        <img src={Back} alt="back" className="back" />
        <div className="cube2">
            <h2>Forgot Passwoard</h2>
            <div className="cube-paragraf">
                <p>Enter Your Email Adress to Recieve a Verivication Cord</p>
            </div>
        <input
            type="text"
            name="email"
            // onChange={handleChange}
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
