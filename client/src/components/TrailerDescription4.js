import React, { useState, useEffect } from 'react';
import './TrailerDescription.css'; // Подключаем CSS для стилизации

const TrailerDescription4 = () => {
  const images = [
    '/uploads/advantages/bl4/IMGP8193.webp',
    '/uploads/advantages/bl4/IMGP8235.webp',
   
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
        <p>ДЛЯ АКТИВНОГО ОТДЫХА</p>
        <ul className="features-list">
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl4svg/1.svg"
                  alt="Наличие окон и задней двери в базовой комплектации"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Наличие окон и задней двери в базовой комплектации</h3>
              <div className="feature-description">Удобное место для временного укрытия или сна</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl4svg/2.svg"
                  alt="Оцинкованный стальной каркас прицепа"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Быстрая трансформация в зону отдыха</h3>
              <div className="feature-description">Продуманные элементы крепления и фиксации туристического инвентаря</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl4svg/3.svg"
                  alt="Удобные оригинальные задние упоры"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Удобные оригинальные задние упоры</h3>
              <div className="feature-description">Возможность использования на отдыхе без транспортного средства</div>
            </div>
          </li>
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper">
                <img
                  className="feature-img"
                  src="assets/images/trailers/bl4svg/4.svg"
                  alt="Подъемный механизм каркаса тента"
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Широкая опциональность для туризма</h3>
              <div className="feature-description">Большие возможности по увеличению комфорта на отдыхе</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrailerDescription4;
