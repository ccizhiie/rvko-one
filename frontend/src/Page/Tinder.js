import React, { useState } from "react";
import '../tinder.css';
import Logo from "../Asset/logo.png";
import Back from "../Asset/star.png";
import Profil from "../Asset/profil.png";
import Like from "../Asset/like.png";
import Dislike from "../Asset/dislike.png";
import Refresh from "../Asset/refresh.png";

const Tinder = () => {
  const [slideCount, setSlideCount] = useState(0);
  const [startX, setStartX] = useState(null); // Menambahkan startX ke dalam state

  // Fungsi untuk menangani swipe
  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setSlideCount(slideCount + 1);
    } else if (direction === 'left') {
      setSlideCount(slideCount - 1);
    }
  };

  // Event listener untuk menangani swipe
  const handleTouchStart = (e) => {
    // Mengambil posisi awal sentuhan
    const touchStartX = e.touches[1].clientX;
    // Menyimpan posisi awal sentuhan di state untuk membandingkan dengan posisi akhir sentuhan
    setStartX(touchStartX);
  };

  const handleTouchEnd = (e) => {
    // Mengambil posisi akhir sentuhan
    const touchEndX = e.changedTouches[1].clientX;
    // Menghitung jarak pergerakan sentuhan
    const deltaX = touchEndX - startX;
    // Jika jarak pergerakan lebih besar dari 50 piksel, kita menganggap itu sebagai swipe
    if (Math.abs(deltaX) > 50) {
      // Jika pergerakan ke kanan lebih besar dari 0, itu adalah swipe ke kanan, jika tidak, itu adalah swipe ke kiri
      if (deltaX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
  };

  return (
    <div className="container">
      <div className="cube-account" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <img src={Logo} alt="logo" className="logo-account" />
        <img src={Profil} alt="profil" className="profil-tinder" /> 
        <img src={Back} alt="back" className="back-akun" />
        <div className="line"></div>
        <div className="image1"></div>
        <div className="response">
          <img src={Like} alt="like" className="like" />
          <img src={Refresh} alt="fresh" className="fresh" />
          <img src={Dislike} alt="dislike" className="dislike" /> 
        </div>
        <p className="text-like">100</p>
        <p className="text-dislike">100</p>
        <p>Jumlah Slide: {slideCount}</p> 
      </div>
    </div>
  );
};

export default Tinder;
