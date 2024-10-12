import React, { useEffect, useState, useRef } from 'react';

const Header = () => {
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
        <div className="main-menu main-menu-1">
          <ul>
            <li>
              <a href="#background-video" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'background-video')}>
                Главная
              </a>
            </li>
            <li>
              <a href="#about" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'about')}>
                О нас
              </a>
            </li>
            <li>
              <a href="#calculator" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'calculator')}>
                Калькулятор
              </a>
            </li>
            <li>
              <a href="#benefits" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'benefits')}>
                Преимущества
              </a>
            </li>
            <li>
              <a href="#video" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'video')}>
                Видеообзор
              </a>
            </li>
            <li>
              <a href="#contact" className="font-size-1-18 transition-1" onClick={(e) => scrollToSection(e, 'contact')}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
