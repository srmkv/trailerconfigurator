import React, { useState, useEffect } from 'react';
import './TrailerDescription.css'; // Подключаем CSS для стилизации

const TrailerDescription2 = () => {
  const images = [
    '/uploads/advantages/bl2/IMGP6369.webp',
    '/uploads/advantages/bl2/IMGP6369.webp',
    '/uploads/advantages/bl2/IMGP6369.webp',
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
      <div className="trailer-text-l">
        <h1>ПРИЦЕПЫ VOYAGE</h1>
        <p>ДЛЯ ГРУЗОПЕРЕВОЗОК</p>
        <ul className="features-list">
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl2svg/1.svg"
                  alt="Отделка кузова влагостойкой фанерой"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Отделка кузова влагостойкой фанерой</h3>
              <div className="feature-description">Бакелитовая фанера 9мм с защитной сеткой</div>
            </div>
          </li>
          {/* Добавьте остальные элементы списка по аналогии */}
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl2svg/2.svg"
                  alt="Надежная рессорная подвеска"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Надежная рессорная подвеска</h3>
              <div className="feature-description">Классическая подвеска для дорог с любым покрытием</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl2svg/3.svg"
                  alt="Уникальная система крепления грузов"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Уникальная система крепления грузов</h3>
              <div className="feature-description">Закладные элементы креплений к полу в базовой комплектации</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl2svg/4.svg"
                  alt="Подъемный механизм каркаса тента"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Инструментальный ящик</h3>
              <div className="feature-description">Удобное хранение перчаток и инструмента</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrailerDescription2;
