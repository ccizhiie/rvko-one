import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../tinder.css";
import axios from "axios";
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Like from "../Asset/like.png";
import Dislike from "../Asset/dislike.png";
import Refresh from "../Asset/refresh.png";

const Tinder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [send, setSend] = useState(0);
  const [Imgdata, setImgdata] = useState();
  const [images, setImages] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupType, setPopupType] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  const [Error, setError] = useState();

  const handleSwipeRight = () => {
    if (!showPopup) {
      setImgdata((prevImgData) => {
        const updatedImgData = [...prevImgData];
        updatedImgData[currentIndex] = {
          ...updatedImgData[currentIndex],
          like: (updatedImgData[currentIndex].like = 1),
        };
        return updatedImgData;
      });

      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 2;
        return nextIndex;
      });
      setSend((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex;
      });
    }
  };

  const handleSwipeLeft = () => {
    if (!showPopup) {
      setImgdata((prevImgData) => {
        const updatedImgData = [...prevImgData];
        updatedImgData[currentIndex] = {
          ...updatedImgData[currentIndex],
          dislike: (updatedImgData[currentIndex].dislike = 1),
        };
        return updatedImgData;
      });
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 2;
        return nextIndex;
      });
      setSend((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex;
      });
    }
  };

  const handleSwipeRefresh = () => {
    if (!showPopup) {
      setCurrentIndex(0);
      setImages(null);
      setSend(0);
    }
  };

  const handleSwipeUp = () => {
    if (!showPopup) {
      setCurrentIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 2
      );
    }
  };

  const handleSkipPopup = () => {
    if (popupType === 1) {
      setPopupType(2);
    } else {
      setShowPopup(false);
    }
  };

  if (!images) {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/tinder/${id}`
        );
        const data = response.data;
        setImages(data.images);
        setImgdata(data.data);
        if (data.tinder !== "open") {
          navigate(`/home/${id}/true`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Data tidak dapat di load");
      }
    };

    fetchData();
    return (
      <div align="center">
        <h1>Loading.....</h1>
        <br />
        <h1>{`${Error}`}</h1>
      </div>
    );
  }
  if (images && Imgdata && send === images.length) {
    const Send = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/tinder/${id}`,
          {
            images: Imgdata,
          }
        );
        if (response.status === 200) {
          navigate(`/home/${id}/false`);
        }
      } catch (error) {
        console.error("Error send data:", error);
        alert(error.response.data.error);
      }
    };
    Send();
  }
  return (
    <div className="container">
      {showPopup && (
        <div className="popup-background">
          {popupType === 1 ? (
            <div className="popup">
              <p>Swipe left to like</p>
              <p className="skip" onClick={handleSkipPopup}>
                Skip
              </p>
            </div>
          ) : (
            <div className="popup2">
              <p>Swipe right to dilike</p>
              <p className="skip" onClick={handleSkipPopup}>
                Skip
              </p>
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
        <div
          className="image1"
          style={{ backgroundImage: `url(${images[currentIndex].imageUrl})` }}
          onClick={handleSwipeUp}
        ></div>
        <div className="response">
          <img
            src={Like}
            alt="like"
            className="like"
            onClick={handleSwipeRight}
          />
          <img
            src={Refresh}
            alt="fresh"
            className="fresh"
            onClick={handleSwipeRefresh}
          />
          <img
            src={Dislike}
            alt="dislike"
            className="dislike"
            onClick={handleSwipeLeft}
          />
        </div>
        {/* <p className="text-like">{images[currentIndex].like}</p>
        <p className="text-dislike">{images[currentIndex].dislike}</p> */}
      </div>
    </div>
  );
};

export default Tinder;
