// Header.js
import React, { useEffect, useState, useRef } from 'react';
import './Header.css';

const Header = ({ onOpenPopup }) => { // Принимаем onOpenPopup через пропсы
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  // Функция плавного скролла к указанной секции
  const scrollToSection = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Используем IntersectionObserver для липкого заголовка
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1, rootMargin: "-100px 0px 0px 0px" }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <header ref={headerRef} className={`header-area-1 header-sticky ${isSticky ? 'sticky-on' : ''}`}>
      <div className="header-wrapper">
        <div className="menu-bar">
          <a href="#" className="menu-bar-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="15" viewBox="0 0 49 15" fill="#CCDEFF">
              <line x1="0.249" y1="1.416" x2="48.622" y2="1.416" stroke="#CCDEFF" strokeWidth="2" />
              <line x1="0.249" y1="13.922" x2="48.622" y2="13.922" stroke="#CCDEFF" strokeWidth="2" />
            </svg>
          </a>
        </div>
        <div className="logo">
          <a href="index.html">
            <img src="assets/images/logo.png" className="logotip" alt="VRE" />
          </a>
        </div>
        <div className="main-menu main-menu-1">
          <ul>
            <li>
              <a href="#about" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'about')}>
                О прицепах Voyage
              </a>
            </li>
            <li>
              <a href="#product" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'product')}>
                Модельный ряд
              </a>
            </li>
            <li>
              <a href="#calculator" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'calculator')}>
                Конфигуратор
              </a>
            </li>
            <li>
              <a href="#benefits" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'benefits')}>
                Преимущества
              </a>
            </li>
            <li>
              <a href="#say" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'say')}>
                Отзывы
              </a>
            </li>
            <li>
              <a href="#contact" className="font-size-1-14 transition-1" onClick={(e) => scrollToSection(e, 'contact')}>
                Где купить?
              </a>
            </li>
            <li>
              {/* Пункт меню "Контакты" для открытия попапа */}
              <a href="#" className="font-size-1-14 transition-1" onClick={(e) => { 
                e.preventDefault(); 
                onOpenPopup(); 
              }}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
        <div className="get-in-touch">
          <div className="phone-numbers">
            <span className="font-size-1-14">+7(495)241-15-05</span>
            <span className="font-size-1-14"> +7(920)251-20-86</span>
          </div>

          <a href="https://t.me/voyageclassic" target="_blank" rel="nofollow noopener" className="icon-soc">
            <img width="30px" src="/uploads/soc/telegram.svg" alt="Telegram" />
          </a>

          <a href="https://www.youtube.com/@voyage77" target="_blank" rel="nofollow noopener" className="icon-soc">
            <img width="30px" src="/uploads/soc/youtube.svg" alt="YouTube" />
          </a>
          <a href="https://ok.ru/group/70000008413227" target="_blank" rel="nofollow noopener" className="icon-soc">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30px" height="30px" fillRule="evenodd" clipRule="evenodd" baseProfile="basic">
              <path fill="#060000" d="M43.462,52H20.538c-2.28,0-4.424-0.888-6.037-2.5C12.889,47.887,12,45.743,12,43.461V20.539c0-2.281,0.889-4.426,2.501-6.038c1.613-1.612,3.757-2.5,6.037-2.5h22.924c2.28,0,4.424,0.888,6.037,2.5C51.111,16.113,52,18.257,52,20.539v22.923c0,2.281-0.889,4.426-2.501,6.038C47.886,51.112,45.742,52,43.462,52z M20.538,16c-1.212,0-2.352,0.472-3.209,1.33C16.472,18.186,16,19.326,16,20.539v22.923c0,1.213,0.472,2.353,1.329,3.209c0.857,0.857,1.997,1.33,3.209,1.33h22.924c1.212,0,2.352-0.472,3.209-1.33C47.528,45.814,48,44.674,48,43.461V20.539c0-1.213-0.472-2.353-1.329-3.209C45.813,16.472,44.674,16,43.462,16H20.538z"/>
              <path fillRule="evenodd" d="M32,19c3.867,0,7,3.133,7,7c0,3.867-3.133,7-7,7s-7-3.133-7-7C25,22.133,28.133,19,32,19z M32,29.062c1.656,0,3-1.344,3-3s-1.344-3-3-3s-3,1.344-3,3S30.344,29.062,32,29.062z" clipRule="evenodd"/>
              <path d="M35.398,38.903c1.391-0.395,2.715-1.025,3.918-1.892c0.724-0.523,0.902-1.554,0.397-2.303c-0.505-0.749-1.502-0.931-2.228-0.411c-1.612,1.165-3.509,1.779-5.484,1.779c-1.97,0-3.863-0.612-5.475-1.77c-0.725-0.522-1.723-0.336-2.226,0.414c-0.505,0.75-0.326,1.781,0.4,2.303c1.199,0.862,2.518,1.488,3.903,1.882l-4.134,4.273c-0.625,0.646-0.625,1.693,0,2.339C24.781,45.839,25.19,46,25.6,46c0.41,0,0.819-0.161,1.131-0.485L32,40.068l5.269,5.447C37.582,45.839,37.991,46,38.4,46c0.41,0,0.818-0.161,1.131-0.485c0.625-0.646,0.625-1.693,0-2.339L35.398,38.903z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/pricepyvoyage/profilecard/?igsh=d3NkdmNxZmZ6bWFr" target="_blank" rel="nofollow noopener" className="icon-soc">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30px" height="30px" fill="#121b1d">
              <path d="M21.580078 7 C13.541078 7 7 13.544938 7 21.585938 L7 42.417969 C7 50.457969 13.544938 57 21.585938 57 L42.417969 57 C50.457969 57 57 50.455062 57 42.414062 L57 21.580078 C57 13.541078 50.455062 7 42.414062 7 L21.580078 7 z M47 15 C48.104 15 49 15.896 49 17 C49 18.104 48.104 19 47 19 C45.896 19 45 18.104 45 17 C45 15.896 45.896 15 47 15 z M32 19 C39.17 19 45 24.83 45 32 C45 39.17 39.169 45 32 45 C24.83 45 19 39.169 19 32 C19 24.831 24.83 19 32 19 z M32 23 C27.029 23 23 27.029 23 32 C23 36.971 27.029 41 32 41 C36.971 41 41 36.971 41 32 C41 27.029 36.971 23 32 23 z"/>
            </svg>
          </a>
          <a href="https://vk.com/voyagetrailer" target="_blank" rel="nofollow noopener" className="icon-soc">
            <img width="30px" src="/uploads/soc/vk.svg" alt="VK" />
          </a>
          
          {/* Удалите или оставьте кнопку "Контакты" в зависимости от необходимости */}
          {/* Если хотите оставить только пункт меню "Контакты", удалите следующую кнопку */}
          {/* 
          <button className="contacts-button but-fut" onClick={onOpenPopup} style={{ marginLeft: '10px' }}>
            Контакты
          </button> 
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
