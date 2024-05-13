import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../tinder.css';
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Like from "../Asset/like.png";
import Dislike from "../Asset/dislike.png";
import Refresh from "../Asset/refresh.png";

const Tinder = () => {
  const [images, setImages] = useState([
    { imageUrl: "https://storage.googleapis.com/rvko-11.appspot.com/foto/gambar1.jpg?GoogleAccessId=firebase-adminsdk-e35xz%40rvko-11.iam.gserviceaccount.com&Expires=16730298000&Signature=drtdRjuv2nAemrhj94ns%2BzrcKBRXRrcfvb70q9uyA89bhsk898CI%2FYJN973ogI903FAAec7RIQ7Zp8sLmPjzpICR8p%2FgCt0n510MU%2FxZ11pen%2BlAGJxUmc7KrE5a9Hgr4tL4KRe8N6qTpyXzAVFQ0YJRStQGLAqbBcZzYKerH0F49xJCVnz9edPdHThACrqnuSnKJEWGlUeRojAKzHEQXcQl%2B2EIsmKoxcJiR%2FWYcj4Zyf%2FZL%2FAf8qT8l%2BoSAhkAdmuZKDAIp%2BlMfStBGBzQQ1qJ5lprAfwBnQTiUpZaezmaoGxDoHJvyMUM%2FjYW4wqB7MUDDJ8xvw1g4n1VqQOU8w%3D%3D", like: 0, dislike: 0 },
    { imageUrl: "https://storage.googleapis.com/rvko-11.appspot.com/foto/gambar2.jpg?GoogleAccessId=firebase-adminsdk-e35xz%40rvko-11.iam.gserviceaccount.com&Expires=16730298000&Signature=ezegJtjMXHegENi7e2H1E0NUUNcWKn05cmCFdDJnwCRNDi9JmcRywPUvOXejCfwnUxko4HWr8aoWOfLIqI9um6Y7W4jUSQhrEsumHKjpANrgw7%2FwVQsJ6k2nIFeDjTg0oWNN1fuCJicFPCud0jQc2RUyw190rJr6WigYRe2PhwkZbwXzEnzeYNHhRRnB2zKHXf6ohZjvsgfovWiOwTei9JQ78rwJOHd9ZeWYBRsHeY3G76C6uO7GRoXz8FgpjO6EQiXr%2FQ%2F2oNQtgluJfwagds6IDcBPzi9KuVWpmNR%2F%2BZneeJ1IJVBntZ86%2Bd%2BhIxnSezDYMmbhImAYDU27pMXM5A%3D%3D", like: 0, dislike: 0 },
    { imageUrl: "https://storage.googleapis.com/rvko-11.appspot.com/foto/gambar3.jpeg?GoogleAccessId=firebase-adminsdk-e35xz%40rvko-11.iam.gserviceaccount.com&Expires=16730298000&Signature=Qdd8KiKEaFoG14VQ%2B2jFyEJeuan9%2FlMvko9QQhSiqOh9lEt8ngNEjWoAcwzGSLXXRsOsBHdbU5%2B5iNEFbIr7QPz0PXDH6ub1nj5GJASFKi3Mu79z86iHC5HS%2BmxXEn8%2Ftsfw1Mf5rrnLXC5BsCJA4fxXvRg8%2F9K%2Fg5t7nNV2sY5v0omrtysl8A8PAU0vTn%2FVBi283BpzA7kwTer%2Fdgvs%2BN2G9DKcHqdhdTPdgsODdoRQydg2VevMqDZIwJO9AkRe0fixhL%2BLisLO8ibFUUn%2FZ%2FFvGiFYK83OvRtMvGJKRBeAGQ5%2B%2BLJIO6TKcwhr%2Bqtx3eRLZTCZ0zLbDvFs8827NA%3D%3D", like: 0, dislike: 0 }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupType, setPopupType] = useState(1);
  const [showPopup, setShowPopup] = useState(true);

  const handleSwipeRight = () => {
    if (!showPopup && images[currentIndex].like === 0 && images[currentIndex].dislike === 0) {
      setImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[currentIndex].like = 1;
        return updatedImages;
      });
    }
  };

  
  const handleSwipeLeft = () => {
    if (!showPopup ) {
      console.log("p")
      setImages(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages[currentIndex].dislike = 1;
        return updatedImages;
      });
    }
  };

  const handleSwipeRefresh = () => {
    if (!showPopup) {
      
    }
  };

  const handleSwipeUp = () => {
    if (!showPopup) {
      setCurrentIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }
  };

  const handleSkipPopup = () => {
    if (popupType === 1) {
      setPopupType(2); 
    } else {
      setShowPopup(false); 
    }
  };

  return (
    <div className="container">
      {showPopup && (
        <div className="popup-background">
          {popupType === 1 ? (
            <div className="popup">
              <p>Swipe left to like</p>
              <p className="skip" onClick={handleSkipPopup}>Skip</p>
            </div>
          ) : (
            <div className="popup2">
              <p>Swipe right to dilike</p>
              <p className="skip" onClick={handleSkipPopup}>Skip</p>
            </div>
          )}
          
        </div>
      )}
      <div className="cube-tinder">
        <div className="swipe-left" onClick={handleSwipeRight}></div>
        <div className="swipe-right" onClick={handleSwipeLeft}></div>
        <img src={Logo} alt="logo" className="logo-account" />
        <img src={Profil} alt="profil" className="profil-tinder" /> 
        <img src={Back} alt="back" className="back-tinder" />
        <div className="line"></div>
        <div className="image1" style={{ backgroundImage: `url(${images[currentIndex].imageUrl})` }} onClick={handleSwipeUp}></div>
        <div className="response">
          <img src={Like} alt="like" className="like" />
          <img src={Refresh} alt="fresh" className="fresh" onClick={handleSwipeRefresh} />
          <img src={Dislike} alt="dislike" className="dislike" /> 
        </div>
        <p className="text-like">{images[currentIndex].like}</p>
        <p className="text-dislike">{images[currentIndex].dislike}</p>
      </div>
    </div>
  );
};

export default Tinder;
