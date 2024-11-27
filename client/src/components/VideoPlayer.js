import React from 'react';
import './VideoPlayer.css'; // Подключаем CSS для стилизации

const VideoPlayer = () => {
  // Функция для плавного перехода к нужной секции
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="video-container">
      <video id="background-video" autoPlay loop muted poster="/assets/images/trailers/0024.webp">
        <source src="assets/images/Webmm.webm" type="video/webm" />
      </video>
      <div className="overlay-buttons">
        <button
          className="overlay-button calculator-button"
          onClick={() => scrollToSection('calculator')}
        >
          Калькулятор
        </button>
        <button
          className="overlay-button company-button"
          onClick={() => scrollToSection('about')}
        >
          О компании
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
