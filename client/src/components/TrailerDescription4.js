import React from 'react';
import './TrailerDescription.css'; // Подключаем CSS для стилизации

const TrailerDescription4 = () => {
  return (
    <div className="trailer-description">
      <img 
        src="assets/images/trailers/real/Voyage-5729.jpg" 
        alt="Trailer Background" 
        className="trailerdesck-image"
      />
      <div className="trailer-text-l">
        <h1>ПРИЦЕПЫ VOYAGE</h1>
        <p>ДЛЯ ЛЮБЫХ ЗАДАЧ</p>
        <ul className="features-list">
          <li className="feature-item">
            <div className="icon-wrapper">
              <div className="img-wrapper" style={{ width: '50px' }}>
                <img 
                  className="feature-img" 
                  src="assets/images/trailers/descriptionsvg/1.svg" 
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
              <div className="img-wrapper" style={{ width: '50px' }}>
                <img 
                  className="feature-img" 
                   src="assets/images/trailers/descriptionsvg/2.svg" 
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
              <div className="img-wrapper" style={{ width: '50px' }}>
                <img 
                  className="feature-img" 
                 src="assets/images/trailers/descriptionsvg/3.svg" 
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
              <div className="img-wrapper" style={{ width: '50px' }}>
                <img 
                  className="feature-img" 
                 src="assets/images/trailers/descriptionsvg/4.svg"  
                  alt="Подъемный механизм каркаса тента" 
                />
              </div>
            </div>
            <div className="text-wrapper">
              <h3 className="feature-title">Подъемный механизм каркаса тента</h3>
              <div className="feature-description">Каркас трансформер на пневмоупорах</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrailerDescription4;
