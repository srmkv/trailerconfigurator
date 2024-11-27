import React, { useState, useEffect } from 'react';
import './TrailerDescription.css'; // Подключаем CSS для стилизации

const TrailerDescription3 = () => {
  const images = [
    '/uploads/advantages/bl3/IMGP6380.webp',
    '/uploads/advantages/bl3/IMGP6388.webp',
    '/uploads/advantages/bl3/IMGP8208.webp',
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
        <p>ДЛЯ ПУТЕШЕСТВИЙ</p>
        <ul className="features-list">
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl3svg/1.svg"
                  alt="Быстрая и удобная погрузка/выгрузка грузов и багажа"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Быстрая и удобная погрузка/выгрузка грузов и багажа</h3>
              <div className="feature-description">Простой доступ к необходимым вещам в дороге</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl3svg/2.svg"
                  alt="Аэродинамическая форма каркаса"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Аэродинамическая форма каркаса</h3>
              <div className="feature-description">Снижение сопротивления прицепа и экономия топлива</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl3svg/3.svg"
                  alt="Крепления запасного колеса и лебедки"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Крепления запасного колеса и лебедки</h3>
              <div className="feature-description">Продуманное совмещенное крепление всегда в доступе</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl3svg/4.svg"
                  alt="Подъемный механизм каркаса тента"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Системы фиксации мототехники и спортинвентаря</h3>
              <div className="feature-description">Быстросъемные надежные крепления мотоциклов и велосипедов</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrailerDescription3;
