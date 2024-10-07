import React from 'react';
import './VideoPlayer.css'; // Подключаем CSS для стилизации

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
        <source src="assets/images/videoplayback1.mp4" type="video/mp4" />
      </video>
      <div className="overlay-buttons">
        <button className="overlay-button calculator-button">Калькулятор</button>
        <button className="overlay-button company-button">О компании</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
