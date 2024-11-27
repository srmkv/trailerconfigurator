import React, { useState, useEffect } from 'react';
import './TrailerDescription.css';

const TrailerDescription = () => {
  const images = [
    '/uploads/advantages/bl1/IMGP6363.webp',
    '/uploads/advantages/bl1/IMGP6414.webp',
    '/uploads/advantages/bl1/IMGP6489.webp',
    // Добавьте остальные изображения по необходимости
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Начинаем затухание текущего изображения

      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setFadeIn(true); // Показываем следующее изображение
      }, 1000); // Должно совпадать с длительностью перехода в CSS
    }, 5000); // Интервал между сменой изображений

    return () => clearInterval(interval);
  }, [nextImageIndex, images.length]);

  return (
    <div className="trailer-description">
      {/* Текущее изображение */}
      <img
        src={images[currentImageIndex]}
        alt="Фоновое изображение прицепа"
        className={`trailerdesck-image ${fadeIn ? 'fade-in' : 'fade-out'}`}
      />
      {/* Следующее изображение */}
      <img
        src={images[nextImageIndex]}
        alt="Фоновое изображение прицепа"
        className={`trailerdesck-image next-image ${fadeIn ? 'fade-out' : 'fade-in'}`}
      />
      <div className="trailer-text">
        <h1>ПРИЦЕПЫ VOYAGE</h1>
        <p>ДЛЯ ЛЮБЫХ ЗАДАЧ</p>
        <ul className="features-list">
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl1svg/1.svg"
                  alt="Оригинальный современный дизайн"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Оригинальный современный дизайн</h3>
              <div className="feature-description">Широкая цветовая гамма борта</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl1svg/2.svg"
                  alt="Оцинкованный стальной каркас прицепа"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Оцинкованный стальной каркас прицепа</h3>
              <div className="feature-description">Защита методом горячего цинкования</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl1svg/3.svg"
                  alt="Комбинированная светодиодная оптика"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Комбинированная светодиодная оптика</h3>
              <div className="feature-description">Современная оптика от ведущих производителей</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl1svg/4.svg"
                  alt="Подъемный механизм каркаса тента"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Подъемный механизм каркаса тента</h3>
              <div className="feature-description">Каркас-трансформер на пневмоупорах</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrailerDescription;
