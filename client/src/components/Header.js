import React from 'react';

const Header = () => {
  return (
    <header className="header-area-1 header-sticky">
      <div className="header-wrapper">
        <div className="menu-bar">
          <a href="#" className="menu-bar-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="15" viewBox="0 0 49 15" fill="#CCDEFF">
              <line x1="0.249023" y1="1.41577" x2="48.6221" y2="1.41577" stroke="#CCDEFF" strokeWidth="2" />
              <line x1="0.249023" y1="13.9224" x2="48.6221" y2="13.9224" stroke="#CCDEFF" strokeWidth="2" />
            </svg>
          </a>
        </div>
        <div className="logo">
          <a href="index.html">
            <img src="assets/images/trailers/logo_voyage.png" alt="VRE" />
          </a>
        </div>
        {/* Main Menu */}
        <div className="main-menu main-menu-1">
          <ul>
            <li><a href="#background-video" className="font-size-1-18 transition-1">Главная</a></li>
            <li><a href="#about" className="font-size-1-18 transition-1">О нас</a></li>
            <li><a href="#calculator" className="font-size-1-18 transition-1">Калькулятор</a></li>
            <li><a href="#benefits" className="font-size-1-18 transition-1">Преимущества</a></li>
            <li><a href="#video" className="font-size-1-18 transition-1">Видеообзор</a></li>
            <li><a href="#contact" className="font-size-1-18 transition-1">Контакты</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
