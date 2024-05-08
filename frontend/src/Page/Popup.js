import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import axios from "axios";
import "../Mobile.css";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";

const Popup = () => {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    return (
      <div>
        <button onClick={togglePopup}>Show Popup</button>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>This is a Popup</h2>
              <p>You can put any content here.</p>
              <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };
export default Popup;
