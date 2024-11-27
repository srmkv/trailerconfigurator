import React from 'react';

const MobileMenu = () => {
  return (
    <div className="nft-mobile-menu">
      <button className="close-menu"><i className="fa-solid fa-xmark"></i></button>
      <ul>
       <li>
              <a href="#background-video">
                Главная
              </a>
            </li>
            <li>
              <a href="#about">
                О нас
              </a>
            </li>
            <li>
              <a href="#calculator" >
                Калькулятор
              </a>
            </li>
            <li>
              <a href="#benefits" >
                Преимущества
              </a>
            </li>
            <li>
              <a href="#say" >
                Отзывы
              </a>
            </li>
            <li>
              <a href="#contact" >
                Контакты
              </a>
            </li>
        {/* Other menu items */}
      </ul>
    </div>
  );
};

export default MobileMenu;
